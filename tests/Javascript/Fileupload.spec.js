import { test, expect } from'@playwright/test'

test('Fileupload', async ({ page }) => {
await page.goto("https://testautomationpractice.blogspot.com/")
const Singlefile=page.locator('[id="singleFileInput"]')
await Singlefile.setInputFiles('tests/Files/123.pdf');

//const Multiplefile=page.locator('[id="multipleFilesInput"]')
//await Multiplefile.setInputFiles(['tests/Files/Data.pdf','tests/Files/Data.jpeg']);

})