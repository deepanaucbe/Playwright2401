import {test,expect}from '@playwright/test'
test("Tabledata",async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com")
const table=page.locator('#productTable')
const rows = table.locator('tbody tr');
//Count the total Column & Rows
const totalColumn=await table.locator('thead tr th')
console.log("No of columns:",await totalColumn.count())

const totalRows=await table.locator('tbody tr')
console.log ("No of rows:",await totalRows.count())

//Select single product
const matchedProduct=totalRows.filter
({has:page.locator('td'),
hasText:'Tablet'
})
await matchedProduct.locator('input').click()

//Select multiple products
await multiProducts(totalRows,page,"Smartphone")
await multiProducts(totalRows,page,"Wireless Earbuds")

//Get first page data's
for(let i=0;i<await totalRows.count();i++)
{
    const tds=await totalRows.nth(i).locator('td')
    for(let j=0;j<await tds.count();j++)
    {
    console.log(await tds.nth(j).textContent())
    }
}

//Read data from all the pages in the table
const pages = await page.locator('.pagination li a');
console.log('Number of Pages in the table:', await pages.count());

for (let p = 0; p < await pages.count(); p++) {
  if (p > 0) {
    await pages.nth(p).click();
  }

  for (let i = 0; i < await rows.count(); i++) {
    const row = rows.nth(i);
    const tds = row.locator('td');

    for (let j = 0; j < await tds.count() - 1; j++) {
      console.log(await tds.nth(j).textContent());
    }
  }
  await page.waitForTimeout(5000)
}

})

//Reusable function to select product
async function multiProducts(rows, page, name) {
  const matchedRow = rows.filter({
    has: page.locator('td'),
    hasText: name
  });

  await matchedRow.locator('input').check();
}
