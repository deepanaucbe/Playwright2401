import { test, expect } from '@playwright/test';

test('Frames', async ({ page }) => {
await page.goto('https://ui.vision/demo/webtest/frames/');
//Count of frames
const Allframes=await page.frames()
console.log("Frames count=",Allframes.length)

//Approach-1
const frame1=await page.frame( {url:"https://ui.vision/demo/webtest/frames/frame_1.html"})
await frame1.locator('[name="mytext1"]').fill('Deepan')

//Approach-2
const frame2=await page.frameLocator('[src="frame_2.html"]')
await frame2.locator('[name="mytext2"]').fill("Honey")

  })

//Handling inner frame
  test('Inner frames', async ({ page }) => {
await page.goto('https://ui.vision/demo/webtest/frames/');

const frame3= await page.frame( {url:"https://ui.vision/demo/webtest/frames/frame_3.html"})
const ChildFrame= await frame3.childFrames()
console.log(await ChildFrame.length)
await ChildFrame[0].locator('(//div[@class="vd3tt"])[1]').click()
await ChildFrame[0].locator('//span[text()="Choose"]').click();
//selecting dropdown
const yesOption = ChildFrame[0].locator('//span[normalize-space()="Yes"]');
await yesOption.waitFor({ state: 'visible' });  
await yesOption.click({ force: true, timeout: 5000 });
//Click next
await ChildFrame[0].click('(//div[@class="e19J0b CeoRYc"])[2]')
const inputname=await ChildFrame[0].locator('//input[@class="whsOnd zHQkBf"]')
//Enter name
const confirmname=await inputname.fill('Seyon')
await expect(inputname).toHaveValue('Seyon')
console.log(confirmname)
//Submit
await ChildFrame[0].locator('//span[text()="Submit"]')

  })