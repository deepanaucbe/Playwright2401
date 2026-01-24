import { test } from '@playwright/test'

test('Hover Components', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/')

  const computers=await page.locator('//a[text()="Computers"]')
  const notebooks=await page.locator('//a[text()="Notebooks"]')

  await computers.hover()
  await notebooks.hover()
  await notebooks.click()
})