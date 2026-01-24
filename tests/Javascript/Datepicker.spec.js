import{test,expect}from '@playwright/test'
test("Datepicker",async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com")

//First approach
//const datePicker=await page.locator("[id='datepicker']")
//await datePicker.fill('12/25/1990')
//await expect(datePicker).toHaveValue('12/25/2026')

//Secons approach
let selectedDate="25"
let selectedMonth="December"
let selectedYear="2020"
await page.locator("[id='datepicker']").click()
while (true) {
  const presentMonth=await page.locator("//span[@class='ui-datepicker-month']").textContent()
  const presentYear= await page.locator(".ui-datepicker-year").textContent()
  if (presentMonth===selectedMonth && presentYear===selectedYear)
    {
    break
    }
    
 await page.click("//span[text()='Prev']")

}
//Approach-1
    await page.locator(`//a[text()='${selectedDate}']`).click()
    await expect(page.locator("#datepicker")).toHaveValue("12/25/2020");

//Approach-2   
//const allDates=await page.$$('[class="ui-state-default"]')
//for (let dates of allDates) {
//    if (await dates.textContent()===selectedDate) {
//       await dates.click()
//        break
//    }


})