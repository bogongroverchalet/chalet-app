// Outbox for NOBs reports, shared by the page and the service worker (so no window/localStorage here).
// One IndexedDB record per `${year}/${weekNo}/${role}/${kind}`; uploading only marks it sent, so the
// form can show "sent at …" and an unchanged form isn't re-sent.
export const REPORTS_URL = 'https://reports.bogongroverchalet.org.au'
const STORE = 'outbox'

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('report-outbox', 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'key' })
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function withStore(mode, fn) {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode)
    const req = fn(tx.objectStore(STORE))
    tx.oncomplete = () => resolve(req?.result)
    tx.onerror = () => reject(tx.error)
  })
}

export const getEntry = (key) => withStore('readonly', (s) => s.get(key))
export const putEntry = (entry) => withStore('readwrite', (s) => s.put(entry))

// Uploads every unsent entry. Throws on network failure so a `sync` event gets retried by the browser.
export async function flushOutbox(onSent) {
  const entries = await withStore('readonly', (s) => s.getAll())
  for (const e of entries.filter((e) => e.sentVersion !== e.version)) {
    const res = await fetch(`${REPORTS_URL}/api/reports/${e.key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': e.body.type,
        'X-Device-Id': e.deviceId,
        'X-Reporter-Name': encodeURIComponent(e.name ?? ''),
      },
      body: e.body,
    })
    if (res.status >= 500) throw new Error(`reports server ${res.status}`)
    // 4xx won't succeed on retry; record it so it isn't resent forever
    const result = { sentVersion: e.version, sentAt: res.ok ? Date.now() : null, error: res.ok ? null : res.status }
    await withStore('readwrite', (s) => {
      const get = s.get(e.key)
      // only if the form wasn't re-queued while this upload was in flight
      get.onsuccess = () => get.result?.version === e.version && s.put({ ...get.result, ...result })
      return get
    })
    if (res.ok) await onSent?.(e)
  }
}

export function sentNotification(e) {
  return [
    `${e.title} submitted ✓`,
    { body: `${e.week} — filed in the Chalet Dropbox.`, tag: e.key, icon: '/logo192.png' },
  ]
}
