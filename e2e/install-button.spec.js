const { test, expect } = require('@playwright/test')

// The home page's "Add to home screen" button. Needs a production build (BASE_URL): OfflineStatus renders nothing in dev.
test.skip(!process.env.BASE_URL, 'needs BASE_URL pointing at a production build')
test.beforeEach(async ({ page }) => page.addInitScript(() => localStorage.setItem('InitialDialogDone', 'true')))

const button = (page) => page.getByRole('button', { name: 'Add to home screen' })

test('Chrome: button appears once installable and opens the browser prompt', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('status').first()).toBeVisible()
  await expect(button(page)).toHaveCount(0) // not installable yet
  await page.evaluate(() => {
    const e = new Event('beforeinstallprompt', { cancelable: true })
    e.prompt = () => (window.prompted = true)
    e.userChoice = Promise.resolve({ outcome: 'accepted' })
    window.dispatchEvent(e)
  })
  await button(page).click()
  expect(await page.evaluate(() => window.prompted)).toBe(true)
  await expect(button(page)).toHaveCount(0) // a prompt is single-use
})

test.describe('iPhone', () => {
  test.use({
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  })
  test('button shows Share → Add to Home Screen instructions', async ({ page }) => {
    await page.goto('/')
    await button(page).click()
    await expect(page.getByText(/In Safari, tap Share/)).toBeVisible()
  })
})
