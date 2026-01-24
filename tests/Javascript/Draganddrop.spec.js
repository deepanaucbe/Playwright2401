import {test,expect  } from "@playwright/test";
test("Drag&drop",async({page})=>{

await page.goto("https://www.lambdatest.com/selenium-playground/drag-and-drop-demo")

const A=await page.locator("//span[text()='Draggable 1']")
const B=await page.locator("//div[@id='mydropzone']")
const C=await page.locator("//div[@class='w-1/4']")

//Approach-1
// await A.hover()
// await page.mouse.down()
// await B.hover()
// await page.mouse.up()
// await expect(C).toContainText("Draggable 1")

//Approach-2
 await A.dragTo(B)
 await expect(C).toContainText("Draggable 1")
}
)