import{test,expect}from 'playwright/test'
test("DropDown",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/")
    const dropdown=await page.locator("#country")
//Approach-1
await dropdown.selectOption('India')

//Approach-2
await dropdown.selectOption({label:'Japan'})

//Approach-3
await dropdown.selectOption({value:'france'})

//Approach-4
await dropdown.selectOption({index:2})

//Assertion
const numberOfDropDowns=await page.locator('#country option')
//console.log(await numberOfDropDowns.textContent())
const texts = await numberOfDropDowns.allTextContents();
console.log(texts);
await expect (numberOfDropDowns).toHaveCount(10)

const allDropDowns=await page.$$('#country option')
await expect (allDropDowns.length).toBe(10)
}
)