//BuildinLocators
import { test,expect } from "@playwright/test";
test("BuildinLocators",async({page})=>{
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

//Get by altText
const Orangelogo=await page.getByAltText("Company-branding")
await expect(Orangelogo).toBeVisible()

//Get by PlaceHolder
const UserInput=await page.getByPlaceholder('Username')
await UserInput.fill('Admin')
await expect(UserInput).toBeVisible()
await expect(UserInput).toBeEnabled()   
await expect (await page.getByPlaceholder('password')).toBeEmpty()
await page.getByPlaceholder('password').fill('admin123')

//Get by role
await page.getByRole('button',{name:'login'}).click()

//Get by text
const userName=await page.locator('//span[contains(@class,"oxd-userdropdown-tab")]').textContent()
console.log(userName)
await expect (await page.getByText(userName.trim())).toBeVisible()
console.log("Final:" , userName)

//Get by title
const title=await page.getByTitle('Help')
await expect (title).toBeVisible()

//Get by label
await page.getByLabel('sidepanel')
})