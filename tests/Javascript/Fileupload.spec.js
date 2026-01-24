import { test, expect } from'@playwright/test'

test('Fileupload', async ({ page }) => {
await page.goto("https://testautomationpractice.blogspot.com/")
const Singlefile=await page.locator('[id="singleFileInput"]')
await Singlefile.setInputFiles('tests/Files/Data.pdf');

const Multiplefile=await page.locator('[id="multipleFilesInput"]')
await Multiplefile.setInputFiles(['tests/Files/Data.pdf','tests/Files/Data.jpeg']);

})