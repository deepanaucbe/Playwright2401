import {test,expect} from '@playwright/test'
import path from 'path';
test('upload file and verify file name',async ({page}) =>{
await page.goto("https://the-internet.herokuapp.com/upload")
const filePath= 'c:\\Sample.txt'
const expectedFileName= path.basename(filePath)
await page.locator('#file-upload').setInputFiles(filePath)
await page.locator('#file-submit').click()
const uploadedFileName= await page.locator('#uploaded-files').textContent()
console.log(uploadedFileName)
expect (uploadedFileName.trim()).toBe(expectedFileName)

}
)