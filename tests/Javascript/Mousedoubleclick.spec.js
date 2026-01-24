import { expect, test } from '@playwright/test'

test('Mouse double click', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/')
  //await page.locator('#field2').click()
  await page.dblclick("//button[text()='Copy Text']")
  await expect(await page.locator("#field2")).toHaveValue('Hello World!')
 
  
})