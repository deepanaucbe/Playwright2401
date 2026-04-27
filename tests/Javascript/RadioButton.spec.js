const{expect,test}=require("@playwright/test")
test("Radio button",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator('#male').check()
    await expect (await page.locator('#male')).toBeChecked()
})