//Page object model
import{test,expect}from '@playwright/test'

import { LoginPage } from "./LoginPage"
import { HomePage } from './HomePage'
import { CartPage } from './CartPage'


    test("Login Page",async({page})=>{

    const login=new LoginPage(page) 
    await login.gotoLoginPage()
    await login.login("test","test")

    const home=new HomePage(page)
    await home.addProductToCart("Sony vaio i5")
    await home.goToCart()

    const cart=new CartPage(page)
    await page.waitForSelector("//tbody[@id='tbodyid']/tr");

const isProductPresent = await cart.checkProductInCart("Sony vaio i5");
await expect(isProductPresent).toBeTruthy();
    //await cart.checkProductInCart("Nexus 6")
//     const isProductPresent = await cart.checkProductInCart("Nexus 6");

// await expect(isProductPresent).toBeTruthy();

})
