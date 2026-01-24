exports.CartPage = class CartPage {

  constructor(page) {
    this.page = page;
    this.productsInCart = 'xpath=//tbody[@id="tbodyid"]/tr/td[2]';
  }

  async checkProductInCart(productName) {
    const products = await this.page.$$(this.productsInCart);
    for (const product of products) {
      const text = (await product.textContent()).trim();
      console.log(text);
      if (text === productName) {
        return true;
      }
    }
    return false;
  }
};
