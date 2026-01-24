import { expect, test } from '@playwright/test'

test('Mouse right click', async ({ page }) => {
  await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html')
  const rightclick=await page.locator('//span[text()="right click me"]')
  await rightclick.click({button : 'right'})
  await page.locator('//span[text()="Quit"]').click()  
 
//If auto accept not managing by default below use to include
//await page.on("dialog",async (dialog) => {
//await expect(dialog.type()).toEqual("alert")
//await expect(dialog.accept()).toContain("I am an alert") 
//await dialog.accept()
//})
 
}) 