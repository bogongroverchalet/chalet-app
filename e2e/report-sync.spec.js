const { test, expect } = require('@playwright/test')

// Offline-first report sync: drafts back up silently, "Mark as done" sends a PDF once there's signal.
// Uploads are intercepted, so nothing reaches the real reports server / Dropbox.
test('PL report: draft queued offline, backed up when online, then submitted as PDF', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('InitialDialogDone', 'true'))
  let online = false
  const puts = []
  await page.route('https://reports.bogongroverchalet.org.au/**', async (route) => {
    if (!online) return route.abort('internetdisconnected')
    const req = route.request()
    if (req.method() === 'PUT') puts.push({ url: req.url(), headers: req.headers(), body: req.postDataBuffer() })
    return route.fulfill({ status: 204, headers: { 'Access-Control-Allow-Origin': '*' } })
  })

  await page.goto('/nobs/report/pl')
  const done = page.getByRole('button', { name: 'Mark as done' })
  await expect(done).toBeDisabled() // needs a name first

  await page.locator('#pl-name').fill('Zoë O’Brien')
  await page.locator('textarea').first().fill('Great week.')
  await expect(page.getByRole('status')).toContainText('Draft saved on this phone')

  online = true
  await page.evaluate(() => window.dispatchEvent(new Event('online')))
  await expect(page.getByRole('status')).toContainText('Draft backed up')
  const draft = puts.at(-1)
  expect(draft.url).toMatch(/\/api\/reports\/\d{4}\/Week%20\d+\/pl\/draft$/)
  expect(decodeURIComponent(draft.headers['x-reporter-name'])).toBe('Zoë O’Brien')
  expect(JSON.parse(draft.body.toString()).winterPartyReport).toBe('Great week.')

  await done.click()
  await expect(page.getByRole('status')).toContainText('Submitted', { timeout: 20000 })
  const pdf = puts.find((p) => p.url.endsWith('/pl/done'))
  expect(pdf.url).toMatch(/\/pl\/done$/)
  expect(pdf.body.subarray(0, 5).toString()).toBe('%PDF-')

  await page.locator('textarea').first().fill('Great week. Edited.')
  await expect(page.getByRole('status')).toContainText('changed this since marking it done')
})

for (const [role, nameId] of [
  ['pa', 'pa-name'],
  ['qm', 'qm-name'],
  ['tl', 'tl-name'],
  ['ce', 'ce-name'],
  ['merch', 'merch-pa-name'],
]) {
  test(`${role} report: Mark as done sends a PDF`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('InitialDialogDone', 'true'))
    const puts = []
    await page.route('https://reports.bogongroverchalet.org.au/**', (route) => {
      if (route.request().method() === 'PUT') puts.push(route.request())
      return route.fulfill({ status: 204, headers: { 'Access-Control-Allow-Origin': '*' } })
    })
    await page.goto(`/nobs/report/${role}`)
    await page.locator(`#${nameId}`).fill('Test Person')
    await page.getByRole('button', { name: 'Mark as done' }).click()
    await expect(page.getByRole('status')).toContainText('Submitted', { timeout: 20000 })
    const pdf = puts.find((r) => r.url().endsWith(`/${role}/done`))
    expect(pdf.postDataBuffer().subarray(0, 5).toString()).toBe('%PDF-')
  })
}

test('working bee from the summer list files under its own folder', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('InitialDialogDone', 'true'))
  const puts = []
  await page.route('https://reports.bogongroverchalet.org.au/**', (route) => {
    if (route.request().method() === 'PUT') puts.push(route.request().url())
    return route.fulfill({ status: 204, headers: { 'Access-Control-Allow-Origin': '*' } })
  })
  await page.goto('/nobs/report/pl')
  await page.locator('#week-select').selectOption('Australia Day working bee')
  await page.locator('#pl-name').fill('Sam')
  await page.getByRole('button', { name: 'Mark as done' }).click()
  await expect(page.getByRole('status')).toContainText('Submitted', { timeout: 20000 })
  expect(puts).toContainEqual(expect.stringMatching(/\/\d{4}\/Australia%20Day%20working%20bee\/pl\/done$/))

  await page.reload()
  await expect(page.locator('#week-select')).toHaveValue('Australia Day working bee')
  await expect(page.getByText('✓ Submitted')).toBeVisible()
})

test('clearing a submitted report says it was already submitted', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('InitialDialogDone', 'true'))
  await page.route('https://reports.bogongroverchalet.org.au/**', (route) =>
    route.fulfill({ status: 204, headers: { 'Access-Control-Allow-Origin': '*' } })
  )
  await page.goto('/nobs/report/pl')
  await page.locator('#week-select').selectOption('Summer week')
  await page.locator('#pl-name').fill('Sam')
  await page.getByRole('button', { name: 'Mark as done' }).click()
  await expect(page.getByRole('status')).toContainText('Submitted', { timeout: 20000 })
  await page.getByRole('button', { name: 'Clear' }).click()
  await page.getByRole('dialog').getByRole('textbox').fill('Summer week')
  await page.getByRole('dialog').getByRole('button', { name: 'Clear' }).click()
  await expect(page.getByRole('status')).toContainText('already submitted')
})

test('hidden Testing week: 5 taps on the build date reveals it', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('InitialDialogDone', 'true'))
  const puts = []
  await page.route('https://reports.bogongroverchalet.org.au/**', (route) => {
    if (route.request().method() === 'PUT') puts.push(route.request().url())
    return route.fulfill({ status: 204, headers: { 'Access-Control-Allow-Origin': '*' } })
  })
  await page.goto('/nobs/report/pl')
  await expect(page.locator('#week-select option[value="Testing"]')).toHaveCount(0)

  await page.goto('/')
  for (let i = 0; i < 5; i++) await page.getByText('Build date:').click()
  await expect(page.getByRole('status')).toContainText('Testing mode on')

  await page.goto('/nobs/report/pl')
  await page.locator('#week-select').selectOption('Testing')
  await page.locator('#pl-name').fill('Sam')
  await page.getByRole('button', { name: 'Mark as done' }).click()
  await expect(page.getByRole('status')).toContainText('Submitted', { timeout: 20000 })
  expect(puts).toContainEqual(expect.stringMatching(/\/\d{4}\/Testing\/pl\/done$/))
})
