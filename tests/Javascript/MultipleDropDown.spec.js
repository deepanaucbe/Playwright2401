import{test,expect}from '@playwright/test'
import { off } from 'node:cluster'
test("MultipleDropdown",async({page})=>{
test.slow();
await page.goto('https://testautomationpractice.blogspot.com/')
//Aproach-1
await page.locator('#colors').selectOption["Red","Green","Yellow"]
//Aproach-2
await page.selectOption('#colors',["Red","Green","Yellow"])
//Assertion
const listofDropDown1=await page.locator("#colors option")
await expect(listofDropDown1).toHaveCount(7)

const listofDropDown2=await page.$$('#colors option')
await expect(listofDropDown2.length).toBe(7)

})


  
  test('JQuery Multi Drop Down', async ({ page }) => {
    await page.goto('https://springstubbe.us/projects/jquery-multiselect/');
  
    // ✅ Correct dropdown button
    await page.locator('#ms-list-3').click();
  
    // ✅ Correct options
    const options = page.locator('#ms-list-3 li ul li');
    const Totalcount = await options.count();
    console.log('Total options:', Totalcount);
  
    for (let i = 0; i < Totalcount; i++) {
      const text = (await options.nth(i).innerText()).trim();
  
      const Seletedtext = text.trim();
  
  if (Seletedtext === 'Java' || Seletedtext === 'Perl' || Seletedtext === 'Android') {
    console.log('Selected:', Seletedtext);
    await options.nth(i).locator('input[type="checkbox"]').check();
  }
    }
  })
  