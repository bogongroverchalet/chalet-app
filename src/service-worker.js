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
import { cacheNames } from 'workbox-core'
import { getCacheKeyForURL } from 'workbox-precaching'

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

registerRoute(
  ({ url }) => url.pathname.endsWith('.mp4'),
  async ({ request, url }) => {
    const cache = await caches.open(cacheNames.precache)
    const response = await cache.match(getCacheKeyForURL(url.pathname))
    if (!response) return fetch(request)
    return createPartialResponse(request, response)
  }
)
precache([{ url: '/bathroom.mp4', revision: '2' }])
precache([{ url: '/blisters-pt1.mp4', revision: '1' }])
precache([{ url: '/blisters-pt2.mp4', revision: '1' }])

const WEATHER_CACHE = 'weather-v1'
// Must match WEATHER_API_URL in weatherUtils.js
const WEATHER_API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-36.90407103087054&longitude=147.30311304330826&hourly=temperature_2m,weathercode,precipitation_probability,precipitation,snowfall,windspeed_10m,windgusts_10m&timezone=Australia%2FMelbourne&forecast_days=7&wind_speed_unit=kmh'

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
