import{test,expect}from "@playwright/test"
test("test 1", async ({page}) => {

  await page.goto("https://www.demoblaze.com/index.html")

  // CLICK LINK TEXT
  await page.click('#login2')

  // FILL USER DETAILS IN INPUT-BOX
  await page.locator("#loginusername").fill("test")
  await page.locator("#loginpassword").fill("test")

  //Click login button
  await page.click("button[onclick='logIn()']")

  // GET ALL PRODUCTS
  const allProducts = await page.$$('.card-title a')
  for (const element of allProducts) {
    const products=await element.textContent()
    console.log(products)
}
//Click logout button
await page.click("#logout2")
})

test("test 2", async ({page}) => {

  await page.goto("https://www.demoblaze.com/index.html")

  // CLICK LINK TEXT
  await page.click('#login2')

  // FILL USER DETAILS IN INPUT-BOX
  await page.locator("#loginusername").fill("test")
  await page.locator("#loginpassword").fill("test")

  //Click login button
  await page.click("button[onclick='logIn()']")

 // Select a PRODUCT
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

//Click logout button
await page.click("#logout2")












//  const allProducts = await page.$$('.card-title a')
//  for (const element of allProducts) {
//     const product=await element.textContent()
//     console.log(product)
})