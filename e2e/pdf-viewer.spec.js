const { test, expect } = require('@playwright/test')

// PdfViewer must fit the page to the phone's width (regression: usehooks-ts onResize signature).
test.use({ viewport: { width: 412, height: 860 }, hasTouch: true, isMobile: true })

test('PDF pages fit the screen width and raise no page errors', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('InitialDialogDone', 'true'))
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('/pdf/code-of-conduct')
  const canvas = page.locator('canvas.react-pdf__Page__canvas').first()
  await expect(canvas).toBeVisible()
  const { width } = await canvas.boundingBox()
  expect(width).toBeLessThanOrEqual(412)
  expect(errors).toEqual([])
})
