import{test,expect}from "@playwright/test"

let context;
let page;

test.beforeAll(async ({ browser }) => {

  context = await browser.newContext();
  page = await context.newPage();
await page.goto("https://www.demoblaze.com/index.html")

  // CLICK LINK TEXT
  await page.click('#login2')
  //await page.waitForSelector("#loginusername");

  // FILL USER DETAILS IN INPUT-BOX
  await page.locator("#loginusername").fill("test")
  await page.locator("#loginpassword").fill("test")

  //Click login button
  await page.click("button[onclick='logIn()']")
  //await page.waitForSelector("#logout2"); 
})



 test.afterAll(async()=>{
await page.click("#logout2")
//await context.close();
})

test("test1",async()=>{
  const allProducts = await page.$$('.card-title a')
  for (const element of allProducts) {
    const products=await element.textContent()
    console.log(products)
  }
})

test("test2",async()=>{
    
    await page.click("//a[text()='Sony xperia z5']")
    
    //Add to cart
    await page.click("//a[text()='Add to cart']")
    
    //Handle dialog box
    await page.on('dialog',async dialog=>{
        await expect(dialog.message()).toEqual("Product added")
        dialog.accept()
    }
    )
    
    //Check whether product added or not
    await page.click("[id='cartur']")
})
