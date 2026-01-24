//Assertions

import {test,expect}from '@playwright/test'

test ("Hard Assertions",async({page})=>{

await page.goto('https://www.demoblaze.com/');

//ASSERTION
await expect(page).toHaveURL("https://www.demoblaze.com/")

//Title
await page.title()
//ASSERTION
await expect(page).toHaveTitle("STORE")

//LOGIN LINK
await page.locator('#login2').click()

//USER INPUT
const user = await page.locator('#loginusername')
await user.fill('test')

//ASSERTION
await expect(user).toBeEditable()
await expect(user).toBeEnabled()

//PASSWORD INPUT
const password = await page.locator('#loginpassword')
await password.fill('test')

//ASSERTION
await expect(password).toBeVisible()

//LOGIN BUTTON
await page.locator("//button[text()='Log in']").click()
})

test.only ("Soft Assertions",async({page})=>{

await page.goto('https://www.demoblaze.com/');

//ASSERTION
await expect.soft(page).toHaveURL("https://www.demoblaze.com.com/")

//Title
await page.title()
//ASSERTION
await expect.soft(page).toHaveTitle("STORE")

//LOGIN LINK
await page.locator('#login2').click()

//USER INPUT
const user = await page.locator('#loginusername')
await user.fill('test')

//ASSERTION
await expect.soft(user).toBeEditable()
await expect.soft(user).toBeEnabled()

//PASSWORD INPUT
const password = await page.locator('#loginpassword')
await password.fill('test')

//ASSERTION
await expect.soft(password).toBeVisible()

//LOGIN BUTTON
await page.locator("//button[text()='Log in']").click()
})