const { test, expect } = require('@playwright/test')

// The "hourly background refresh" switch must only show when the browser grants periodic sync
// (Chrome exposes reg.periodicSync in every tab, but only grants it to installed apps).
// Needs a production build (BASE_URL): the dev server registers no service worker, so the switch never shows there.
test('weather refresh toggle hidden when periodic sync permission is not granted', async ({ page }) => {
  test.setTimeout(120000) // first visit precaches the map and videos before the worker is ready
  await page.addInitScript(() => {
    localStorage.setItem('InitialDialogDone', 'true')
    // Like Android Chrome in a tab: the API is exposed, the permission is not granted
    if (!('periodicSync' in ServiceWorkerRegistration.prototype))
      Object.defineProperty(ServiceWorkerRegistration.prototype, 'periodicSync', {
        get: () => ({ register: async () => {}, unregister: async () => {}, getTags: async () => [] }),
      })
    const query = navigator.permissions.query.bind(navigator.permissions)
    navigator.permissions.query = (d) =>
      d.name === 'periodic-background-sync' ? Promise.resolve({ state: 'denied' }) : query(d)
  })
  await page.goto('/weather')
  await expect(page.getByRole('heading', { name: 'Weather' })).toBeVisible()
  await page.evaluate(() => navigator.serviceWorker.ready)
  await page.waitForTimeout(1000)
  await expect(page.getByRole('checkbox', { name: 'Background auto-refresh' })).toHaveCount(0)
})
