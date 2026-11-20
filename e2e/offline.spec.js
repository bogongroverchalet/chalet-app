const { test, expect } = require('@playwright/test')

// Needs a production build (BASE_URL), since the dev server registers no service worker.
// First visit: the home page's offline status should reach "Ready to use offline"; then with no network
// the app, trips, map tiles and a video must still work.
test.skip(!process.env.BASE_URL, 'needs BASE_URL pointing at a production build')

test('offline status reaches ready, then the app works with no network', async ({ page, context }) => {
  test.setTimeout(300000) // first visit downloads the map and ~62 MB of videos
  await page.addInitScript(() => localStorage.setItem('InitialDialogDone', 'true'))
  await page.goto('/')

  const status = page.getByRole('status').filter({ hasText: /offline/i })
  await expect(status).toContainText(/Saving the app|ready offline|Ready to use offline/)
  await expect(status).toContainText('Ready to use offline', { timeout: 240000 })

  await context.setOffline(true)
  await page.reload()
  await expect(page.locator('h1')).toContainText('Bogong Rover Chalet')
  await expect(status).toContainText('Ready to use offline')

  await page.goto('/trips')
  await expect(page.locator('a[href*="/trips/trip/"]').first()).toBeVisible()

  await page.goto('/trips/map')
  await expect(page.locator('.leaflet-tile-loaded, canvas.leaflet-tile').first()).toBeAttached({ timeout: 60000 })

  // Never opened before going offline, so this only works if the service worker cached it.
  await page.goto('/pdf/code-of-conduct')
  await expect(page.locator('canvas.react-pdf__Page__canvas').first()).toBeVisible({ timeout: 30000 })

  await page.goto('/videos/bathroom')
  const played = await page.locator('video').evaluate(
    (v) =>
      new Promise((resolve) => {
        v.muted = true
        v.play().then(
          () => setTimeout(() => resolve(v.currentTime > 0), 2000),
          () => resolve(false)
        )
      })
  )
  expect(played).toBe(true)
})
