import { test,expect } from "@playwright/test";
test("Keyboardactions",async({page})=>{

await page.goto("https://gotranscript.com/text-compare")
//Fill the text area
const A=await page.locator("//textarea[@name='text1']")
const B=await page.locator("//textarea[@name='text2']")
await A.fill("Deepan Success")
//Select text
await page.keyboard.press('Control+A');

//Copy text
await page.keyboard.press('Control+C');

//Press tab
await page.keyboard.press("Tab")

//Paste the text

await page.keyboard.press('Control+V');
await expect(B).toHaveValue("Deepan Success")
}

)