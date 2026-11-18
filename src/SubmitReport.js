import React from 'react'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import { weekFolder } from './nobs-week'
import { flushOutbox, getEntry, putEntry, sentNotification } from './report-outbox'

const CHANGED = 'report-outbox-changed'
const changed = () => window.dispatchEvent(new Event(CHANGED))

function deviceId() {
  try {
    let id = localStorage.getItem('reportDeviceId')
    if (!id) localStorage.setItem('reportDeviceId', (id = crypto.randomUUID()))
    return id
  } catch {
    return 'no-storage-' + Math.random().toString(36).slice(2, 10)
  }
}

// Only Chromium (Android) can send after the app is closed; iOS sends only while the page is open.
// shortcut: wording says "usually" because closed-app sync didn't fire in a real Android 10 test (2026-11-18); firm it up once proven.
const backgroundSync = () => 'SyncManager' in window && !!navigator.serviceWorker?.controller

// Android Chrome: hand off to the service worker's `sync`, which runs even after the app is closed.
// Elsewhere (iOS Safari, dev without a SW): upload from the page whenever it's open and online.
export async function syncReports() {
  const reg = await navigator.serviceWorker?.getRegistration()
  if (reg?.sync) return reg.sync.register('reports-sync').catch(() => flushFromPage(reg))
  return flushFromPage(reg)
}

// One page-side flush at a time; a call made mid-flush runs after it and finds the sent entries already marked.
let flushing = Promise.resolve()
function flushFromPage(reg) {
  flushing = flushing.then(() => flushNow(reg))
  return flushing
}

async function flushNow(reg) {
  try {
    await flushOutbox(async (e) => {
      changed()
      if (e.kind !== 'done' || window.Notification?.permission !== 'granted') return
      if (reg) await reg.showNotification(...sentNotification(e))
      else new Notification(...sentNotification(e))
    }, 'page')
  } catch {
    // offline: retried on the next `online` event or app open
  }
  changed()
}

navigator.serviceWorker?.addEventListener('message', (e) => e.data?.type === 'reportSent' && changed())
window.addEventListener('online', syncReports)
syncReports()

const hasContent = (v) =>
  v && typeof v === 'object' ? Object.values(v).some(hasContent) : typeof v === 'string' ? v.trim() !== '' : !!v

async function queue(entry) {
  const existing = await getEntry(entry.key)
  if (existing?.fieldsJson === entry.fieldsJson && !existing.error) return
  await putEntry({ ...entry, deviceId: deviceId(), version: Date.now() })
  changed()
  await syncReports()
}

const time = (ms) => new Date(ms).toLocaleString('en-AU', { weekday: 'short', hour: 'numeric', minute: '2-digit' })

// Shown under each form's heading, since Mark as done sits at the bottom of long forms.
export function SubmitHint() {
  return (
    <p className='no-print text-sm text-slate-500 mb-3'>
      This saves on your phone as you go. When it’s finished, press <strong>Mark as done</strong> at the bottom to send
      it.
    </p>
  )
}

// Draft: silently backed up whenever the form changes. Done: a PDF that's filed into Dropbox + a notification.
export default function SubmitReport({ role, title, week, name, nameId, fields, makePdf }) {
  const { year, folder } = weekFolder(week)
  const key = `${year}/${encodeURIComponent(folder)}/${role}`
  const fieldsJson = JSON.stringify(fields)
  const [draft, setDraft] = React.useState()
  const [done, setDone] = React.useState()
  const [busy, setBusy] = React.useState(false)
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    const refresh = () =>
      Promise.all([getEntry(`${key}/draft`), getEntry(`${key}/done`)]).then(([d, o]) => {
        setDraft(d)
        setDone(o)
      })
    refresh()
    window.addEventListener(CHANGED, refresh)
    return () => window.removeEventListener(CHANGED, refresh)
  }, [key])

  React.useEffect(() => {
    if (!hasContent(fields)) return
    const t = setTimeout(() => {
      const body = new Blob([fieldsJson], { type: 'application/json' })
      queue({ key: `${key}/draft`, kind: 'draft', title, week, name, fieldsJson, body }).catch(console.error)
    }, 3000)
    return () => clearTimeout(t)
  }, [key, fieldsJson]) // eslint-disable-line react-hooks/exhaustive-deps

  const markDone = async () => {
    setBusy(true)
    setFailed(false)
    try {
      if (window.Notification?.permission === 'default') await Notification.requestPermission()
      const body = await makePdf()
      await queue({ key: `${key}/done`, kind: 'done', title, week, name, fieldsJson, body })
    } catch (e) {
      console.error('Mark as done failed', e)
      setFailed(true)
    } finally {
      setBusy(false)
    }
  }

  const doneCurrent = done && done.fieldsJson === fieldsJson && !done.error
  const needsName = !name?.trim()
  let status = ''
  if (failed) status = 'Couldn’t prepare the report — please use Share / Download below instead.'
  else if (done?.error && done.fieldsJson === fieldsJson)
    status = `The chalet server rejected this report (error ${done.error}) — please use Share / Download below instead.`
  else if (doneCurrent && done.sentAt) status = `Submitted ${time(done.sentAt)}. Nothing more to do.`
  else if (doneCurrent && backgroundSync())
    status =
      'Marked as done but not sent yet (no signal). It usually sends by itself once you have reception — if this still says Waiting, open the app again.'
  else if (doneCurrent)
    status = 'Marked as done but NOT SENT YET (no signal). Open this page again when you have signal to send it.'
  else if (done && !hasContent(fields))
    status = done.sentAt
      ? `A report for this week was already submitted ${time(done.sentAt)}.`
      : 'A finished report for this week is still waiting to send.'
  else if (done)
    status = 'You’ve changed this since marking it done — press Mark as done again to send the updated version.'
  else if (draft?.error && draft.fieldsJson === fieldsJson)
    status = `The chalet server couldn’t back up this draft (error ${draft.error}). It’s still saved on this phone.`
  else if (draft?.sentAt && draft.fieldsJson === fieldsJson) status = `Draft backed up ${time(draft.sentAt)}.`
  else if (draft) status = 'Draft saved on this phone — it backs up automatically when you have signal.'

  return (
    <div className='no-print my-4 p-3 rounded border border-slate-300'>
      <p className='text-sm text-slate-600 mb-2'>
        When the report is finished, press <strong>Mark as done</strong> and it’s sent to the Chalet for you.{' '}
        {backgroundSync()
          ? 'No signal? It usually sends by itself once you have reception. If it still says Waiting, open the app again.'
          : 'No signal? It sends the next time you open this page with reception.'}
        {window.Notification?.permission === 'default' && ' We’ll ask to notify you when it’s delivered.'}
      </p>
      {needsName && (
        <p id={`${role}-needs-name`} className='text-sm text-amber-800 mb-2'>
          <a
            href={`#${nameId}`}
            className='underline'
            onClick={() => setTimeout(() => document.getElementById(nameId)?.focus())}
          >
            Add your name at the top
          </a>{' '}
          first.
        </p>
      )}
      {doneCurrent ? (
        <span
          className={`inline-block px-3 py-1.5 rounded font-medium ${
            done.sentAt ? 'bg-green-100 text-green-900' : 'bg-amber-100 text-amber-900'
          }`}
        >
          {done.sentAt ? '✓ Submitted' : 'Waiting for signal…'}
        </span>
      ) : (
        <Button
          variant='contained'
          startIcon={<SendIcon />}
          onClick={markDone}
          disabled={busy || needsName}
          aria-describedby={needsName ? `${role}-needs-name` : undefined}
        >
          {busy ? 'Preparing…' : 'Mark as done'}
        </Button>
      )}
      <p className='text-sm mt-2' role='status'>
        {status}
      </p>
    </div>
  )
}
