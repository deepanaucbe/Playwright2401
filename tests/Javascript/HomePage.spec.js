import {test,expect} from "@playwright/test";
test("DEEPAN",async ({page})=> {
    await page.goto("https://d6e5e1.ps.beyondtrustcloud.com/")
    //const A=await page.url()
    //const B=await page.title()
    //console.log("Login page URL:",A)
    //console.log("Page tile is:",B)
    await expect(page).toHaveURL(/beyondtrustcloud.com/)
    await expect (page).toHaveTitle(/BeyondInsight/)
})
