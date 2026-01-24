exports.HomePage = class HomePage {

  constructor(page) {
    this.page = page;
    this.productList = "xpath=//*[@id='tbodyid']//div//div//div//h4//a";
    this.addToCartBtn = "xpath=//a[text()='Add to cart']";
    this.cart = "#cartur";
  }

  async addProductToCart(productName) {
  const product = this.page
    .locator(this.productList)
    .filter({ hasText: productName });

  // Click product safely (no stale element)
  await product.first().click();

  // Handle alert BEFORE clicking Add to cart
  this.page.once('dialog', dialog => dialog.accept());

  await this.page.locator(this.addToCartBtn).click();
  }
    async goToCart() {
    await this.page.locator(this.cart).click();
  }
}



//   async addProductToCart(productName) {
//     const products = await this.page.$$(this.productList);
//     for (const product of products) {
//       if (productName === (await product.textContent()).trim()) {
//         await product.click();
//         break;
//       }
//     }

//     await this.page.locator(this.addToCartBtn).click()
//     await this.page.on('dialog',async dialog=>{
//         if (dialog.message().includes('added')){
//             await dialog.accept()
//         }
//     })
//   }
//   async goToCart(){
//     await this.page.locator(this.cart).click()
//   }
// }
