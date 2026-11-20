/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { skipWaiting, clientsClaim } from 'workbox-core'
import { precache, precacheAndRoute, createHandlerBoundToURL, cleanupOutdatedCaches } from 'workbox-precaching'
import { createPartialResponse } from 'workbox-range-requests'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { cacheNames } from 'workbox-core'
import { getCacheKeyForURL } from 'workbox-precaching'
import { flushOutbox, sentNotification } from './report-outbox'
import pdfRegistry from './pdfRegistry'

skipWaiting()
clientsClaim()

self.addEventListener('activate', async () => {
  const tabs = await self.clients.matchAll({ type: 'window' })
  tabs.forEach((tab) => {
    tab.navigate(tab.url)
  })
})

const MAP_REVISION = '1'
precache([{ url: '/Bogong_High_Plains.pmtiles', revision: MAP_REVISION }])

function uninstallWorker() {
  self.skipWaiting()
  self.registration
    .unregister()
    .then(function () {
      return self.clients.matchAll()
    })
    .then(function (clients) {
      clients.forEach((client) => client.navigate(client.url))
    })
}

registerRoute(
  ({ url }) => url.pathname.endsWith('.pmtiles'),
  async ({ request }) => {
    const cache = await caches.open(cacheNames.precache)
    let response,
      failureTimeout = null
    await (async function getFromCache() {
      response = await cache.match(getCacheKeyForURL('/Bogong_High_Plains.pmtiles'))
      if (!response) {
        if (!failureTimeout) {
          failureTimeout = setTimeout(uninstallWorker, 60e3)
        }
        return new Promise((resolve) => setTimeout(() => getFromCache().then(resolve), 200))
      }
    })()
    clearTimeout(failureTimeout)
    return createPartialResponse(request, response)
  }
)

// The page asks on every app start; resumes any video downloads a killed worker didn't finish.
// The home page's offline status sends it too, so a run already in progress is reused rather than doubled.
let videosRun
self.addEventListener('message', (event) => {
  if (event.data !== 'cacheVideos') return
  videosRun ??= cacheVideos().finally(() => (videosRun = null))
  event.waitUntil(videosRun)
})

self.addEventListener('message', async ({ data, source }) => {
  if (data !== 'isMapDataReady') return

  const cache = await caches.open(cacheNames.precache)
  await (async function waitForCache() {
    if (!(await cache.match(getCacheKeyForURL('/Bogong_High_Plains.pmtiles')))) {
      return new Promise((resolve) => setTimeout(() => waitForCache().then(resolve), 200))
    }
  })()
  source.postMessage('mapDataReady')
})

// Videos (~62 MB) are cached after install instead of precached, so the app shell and map work offline
// within seconds of the first visit rather than only once every video has downloaded.
// Bump VIDEOS_CACHE when any video changes.
const VIDEOS_CACHE = 'videos-v2'
const VIDEOS = ['bathroom', 'blisters-pt1', 'blisters-pt2', 'tow-nutcracker', 'dip-stick']
  .concat([1, 2, 3, 4, 5].map((n) => `water-pt${n}`))
  .map((name) => `/${name}.mp4`)

// The viewer's PDFs live in public/, so they aren't in the build's precache manifest; without this they only
// open offline while the browser's own HTTP cache still holds them (24h, must-revalidate on Netlify).
// Fetched with the videos (first, as they're small) and served stale-while-revalidate so edits still arrive.
const PDFS_CACHE = 'pdfs-v1'
const PDFS = [...new Set(Object.values(pdfRegistry).map(({ file }) => file))]
registerRoute(({ url }) => url.pathname.endsWith('.pdf'), new StaleWhileRevalidate({ cacheName: PDFS_CACHE }))

// Progress goes to every window (including the not-yet-controlled first visit) for the home page's offline status.
async function cacheVideos() {
  const pdfs = await caches.open(PDFS_CACHE)
  await Promise.all(PDFS.map(async (url) => (await pdfs.match(url)) || pdfs.add(url).catch(() => {})))
  const cache = await caches.open(VIDEOS_CACHE)
  const post = async (msg) =>
    (await self.clients.matchAll({ type: 'window', includeUncontrolled: true })).forEach((c) => c.postMessage(msg))
  let done = 0
  for (const url of VIDEOS) {
    if (!(await cache.match(url))) await cache.add(url).catch(() => {})
    if (await cache.match(url)) done++
    await post({ type: 'videoProgress', done, total: VIDEOS.length, finished: false })
  }
  await post({ type: 'videoProgress', done, total: VIDEOS.length, finished: true })
}

registerRoute(
  ({ url }) => url.pathname.endsWith('.mp4'),
  async ({ request, url }) => {
    const response = await caches.match(url.pathname, {
      cacheName: VIDEOS_CACHE,
    })
    if (!response) return fetch(request)
    return createPartialResponse(request, response)
  }
)

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k.startsWith('videos-') && k !== VIDEOS_CACHE).map((k) => caches.delete(k)))
      )
  )
})

registerRoute(
  ({ url }) => url.pathname.startsWith('/merch/') && url.pathname.endsWith('.jpg'),
  new CacheFirst({ cacheName: 'merch-images-v1' })
)

const WEATHER_CACHE = 'weather-v1'
// Must match WEATHER_API_URL in weatherUtils.js
const WEATHER_API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-36.90407103087054&longitude=147.30311304330826&hourly=temperature_2m,weathercode,precipitation_probability,precipitation,snowfall,windspeed_10m,windgusts_10m&daily=sunrise,sunset&timezone=Australia%2FMelbourne&forecast_days=7&wind_speed_unit=kmh'

async function fetchAndCacheWeather() {
  const response = await fetch(WEATHER_API_URL)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const data = await response.json()
  const payload = JSON.stringify({ data, fetchedAt: Date.now() })
  const cache = await caches.open(WEATHER_CACHE)
  await cache.put('/api/weather', new Response(payload, { headers: { 'Content-Type': 'application/json' } }))
}

// Synthetic /api/weather endpoint: network-first, falls back to cached response
registerRoute(
  ({ url }) => url.pathname === '/api/weather',
  async () => {
    const cache = await caches.open(WEATHER_CACHE)
    try {
      await fetchAndCacheWeather()
    } catch {
      // offline or server error — serve stale cache below
    }
    const cached = await cache.match('/api/weather')
    if (cached) return cached
    return new Response(JSON.stringify({ error: 'No weather data available' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }
)

self.addEventListener('periodicsync', (event) => {
  if (event.tag !== 'weather-sync') return
  event.waitUntil(
    fetchAndCacheWeather().then(async () => {
      const clients = await self.clients.matchAll({ type: 'window' })
      clients.forEach((client) => client.postMessage({ type: 'weatherUpdated', fetchedAt: Date.now() }))
    })
  )
})

// One-shot sync: fires when connectivity is restored (registered by the app when it loads)
self.addEventListener('sync', (event) => {
  if (event.tag !== 'weather-sync-once') return
  event.waitUntil(
    fetchAndCacheWeather().then(async () => {
      const clients = await self.clients.matchAll({ type: 'window' })
      clients.forEach((client) => client.postMessage({ type: 'weatherUpdated', fetchedAt: Date.now() }))
    })
  )
})

// NOBs reports queued by SubmitReport: sent when connectivity returns, even with the app closed
self.addEventListener('sync', (event) => {
  if (event.tag !== 'reports-sync') return
  event.waitUntil(
    flushOutbox(async (e) => {
      const clients = await self.clients.matchAll({ type: 'window' })
      clients.forEach((client) => client.postMessage({ type: 'reportSent' }))
      if (e.kind === 'done' && Notification.permission === 'granted')
        await self.registration.showNotification(...sentNotification(e))
    }, 'sw')
  )
})

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
const WB_MANIFEST = self.__WB_MANIFEST
precacheAndRoute(WB_MANIFEST)

cleanupOutdatedCaches()
// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$')
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith('/_')) {
      return false
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false
    } // Return true to signal that we want to use the handler.

    return true
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
)
