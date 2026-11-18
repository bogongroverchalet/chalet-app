// Receives NOBs reports from the PWA and files them into Dropbox at /<year>/Week N/<Role>/.
// Every upload lands on local disk first; a retry loop pushes pending files to Dropbox, so a
// Dropbox outage never loses a report.
import { appendFile, mkdir, readdir, rename, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'

const DATA = process.env.DATA_DIR ?? '/data'
const PORT = Number(process.env.PORT ?? 3000)
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? '').split(',').filter(Boolean)
const MAX_BYTES = 10 * 1024 * 1024
// Same mapping as scripts/lib/report-files.js CATEGORY_FOLDER
const ROLE_FOLDER = { ce: 'CE', pa: 'PA', pl: 'PL', qm: 'QM', tl: 'Tow', merch: 'PA' }
const ROLE_TITLE = { ce: 'CE', pa: 'PA', pl: 'PL', qm: 'QM', tl: 'Tow-Leader', merch: 'Merch' }

const clean = (s, max = 60) =>
  String(s ?? '')
    .replace(/[^\p{L}\p{N} ._-]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)

export function parseUpload(url, headers) {
  const m = url.pathname.match(/^\/api\/reports\/(\d{4})\/([^/]+)\/([a-z]+)\/(done|draft)$/)
  if (!m) return null
  const [, year, rawWeek, role, kind] = m
  let week
  try {
    week = clean(decodeURIComponent(rawWeek))
  } catch {
    return null
  }
  // Bare numbers are from clients queued before week folder names were sent
  if (/^\d{1,2}$/.test(week)) week = `Week ${week}`
  if (!/^(Week \d{1,2}|Summer week|Testing|[\p{L} ]{1,30} working bee)$/u.test(week)) return null
  const device = headers.get('x-device-id') ?? ''
  if (!ROLE_FOLDER[role] || !/^[a-zA-Z0-9-]{8,64}$/.test(device)) return null
  let name = headers.get('x-reporter-name') ?? ''
  try {
    name = decodeURIComponent(name) // client URL-encodes it: headers can't carry non-Latin1 chars
  } catch {}
  name = clean(name) || 'Unnamed'
  const file =
    kind === 'done'
      ? `${ROLE_TITLE[role]} Report ${week} - ${name} (${device.slice(0, 6)}).pdf`
      : `${role}-${device}.json`
  const rel = kind === 'done' ? join(year, week, ROLE_FOLDER[role], file) : join(year, week, file)
  return { kind, rel }
}

function cors(req) {
  const origin = req.headers.get('origin')
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0] ?? '',
    'Access-Control-Allow-Methods': 'PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Device-Id, X-Reporter-Name, X-Sent-By, X-Queued-At',
    Vary: 'Origin',
  }
}

async function handle(req) {
  const headers = cors(req)
  const reply = (status, body) => new Response(body, { status, headers })
  const url = new URL(req.url)
  if (url.pathname === '/health') return reply(200, 'ok')
  if (req.method === 'OPTIONS') return reply(204)
  if (req.method !== 'PUT') return reply(405)
  const target = parseUpload(url, req.headers)
  if (!target) return reply(400, 'bad path or headers')
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BYTES) return reply(413)
  const body = new Uint8Array(await req.arrayBuffer())
  if (body.length > MAX_BYTES) return reply(413)
  if (target.kind === 'done' && new TextDecoder().decode(body.slice(0, 5)) !== '%PDF-') return reply(415)
  if (target.kind === 'draft') {
    try {
      JSON.parse(new TextDecoder().decode(body))
    } catch {
      return reply(415)
    }
  }
  const base = target.kind === 'done' ? 'pending' : 'drafts'
  const path = join(DATA, base, target.rel)
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path + '.tmp', body)
  await rename(path + '.tmp', path)
  // Device details for debugging delivery (e.g. how long Android's background sync took)
  const queuedAt = Number(req.headers.get('x-queued-at')) || null
  const meta = {
    at: new Date().toISOString(),
    kind: target.kind,
    file: target.rel,
    via: req.headers.get('x-sent-by'),
    delaySec: queuedAt && Math.round((Date.now() - queuedAt) / 1000),
    ua: req.headers.get('user-agent'),
    country: req.headers.get('cf-ipcountry'),
  }
  console.log(JSON.stringify(meta))
  await appendFile(join(DATA, 'uploads.log'), JSON.stringify(meta) + '\n')
  if (target.kind === 'done') flushPending()
  return reply(204)
}

// --- Dropbox (App-folder app; paths are relative to /Apps/<app name>/) ---
let accessToken = null
let tokenExpiry = 0
async function dropboxToken() {
  if (accessToken && Date.now() < tokenExpiry) return accessToken
  const res = await fetch('https://api.dropboxapi.com/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.DROPBOX_REFRESH_TOKEN,
      client_id: process.env.DROPBOX_APP_KEY,
      client_secret: process.env.DROPBOX_APP_SECRET,
    }),
  })
  if (!res.ok) throw new Error(`dropbox token ${res.status} ${await res.text()}`)
  const json = await res.json()
  accessToken = json.access_token
  tokenExpiry = Date.now() + (json.expires_in - 300) * 1000
  return accessToken
}

// Dropbox-API-Arg is an HTTP header, so non-ASCII must be \u-escaped
const headerJson = (obj) =>
  JSON.stringify(obj).replace(/[\u007f-￿]/g, (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'))

async function uploadToDropbox(rel, body) {
  const res = await fetch('https://content.dropboxapi.com/2/files/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await dropboxToken()}`,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': headerJson({ path: '/' + rel, mode: 'overwrite', mute: true }),
    },
    body,
  })
  if (!res.ok) throw new Error(`dropbox upload ${res.status} ${await res.text()}`)
}

let flushing = false
async function flushPending() {
  if (flushing || !process.env.DROPBOX_REFRESH_TOKEN) return
  flushing = true
  try {
    const pending = join(DATA, 'pending')
    const files = (await readdir(pending, { recursive: true, withFileTypes: true }).catch(() => [])).filter(
      (d) => d.isFile() && d.name.endsWith('.pdf')
    )
    for (const d of files) {
      const abs = join(d.parentPath, d.name)
      const rel = abs.slice(pending.length + 1)
      try {
        await uploadToDropbox(rel, await Bun.file(abs).arrayBuffer())
        const sent = join(DATA, 'sent', rel)
        await mkdir(dirname(sent), { recursive: true })
        await rename(abs, sent)
        console.log(new Date().toISOString(), 'uploaded', rel)
      } catch (e) {
        console.error(new Date().toISOString(), 'upload failed, will retry', rel, e.message)
      }
    }
  } finally {
    flushing = false
  }
}

if (import.meta.main) {
  if (!ALLOWED_ORIGINS.length) throw new Error('ALLOWED_ORIGINS is required')
  Bun.serve({ port: PORT, maxRequestBodySize: MAX_BYTES, fetch: handle })
  setInterval(flushPending, 5 * 60 * 1000)
  flushPending()
  console.log(`reports server on :${PORT}`)
}
