const { test, expect } = require('@playwright/test')

test.use({ geolocation: { latitude: -36.9040535, longitude: 147.3031153, accuracy: 20 }, permissions: ['geolocation'] })

test('my-location marker follows GPS without restarting the watch', async ({ page, context }) => {
  await page.addInitScript(() => {
    localStorage.setItem('InitialDialogDone', 'true')
    window.watchCalls = 0
    window.activeWatches = 0
    const geo = navigator.geolocation
    const [watch, clear] = [geo.watchPosition.bind(geo), geo.clearWatch.bind(geo)]
    geo.watchPosition = (...args) => (window.watchCalls++, window.activeWatches++, watch(...args))
    geo.clearWatch = (id) => (window.activeWatches--, clear(id))
  })
  await page.goto('/trips/map')
  await page.locator('h1 button').click()

  const me = page.locator('.leaflet-marker-icon:has(svg.text-blue-500)')
  await expect(me).toBeVisible()
  await expect(page.locator('h1 button svg')).toHaveClass(/text-blue-500/)
  const before = await me.getAttribute('style')
  const callsBefore = await page.evaluate(() => window.watchCalls)

  await context.setGeolocation({ latitude: -36.9050535, longitude: 147.3041153, accuracy: 20 })
  await expect.poll(() => me.getAttribute('style')).not.toBe(before)
  await context.setGeolocation({ latitude: -36.906, longitude: 147.305, accuracy: 20 })
  await expect.poll(() => me.getAttribute('style')).not.toBe(before)

  // Position updates must not restart the watch (that drops the GPS lock).
  expect(await page.evaluate(() => window.watchCalls)).toBe(callsBefore)
  expect(await page.evaluate(() => window.activeWatches)).toBe(1)
})
