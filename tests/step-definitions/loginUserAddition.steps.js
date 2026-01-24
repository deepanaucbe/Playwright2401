const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage, AdminPage } = require('../pages/loginUserAddition.page');
const { adminUser: userData } = require('../config/testConfig');

let loginPage;
let adminPage;

Given('user is logged into OrangeHRM', async function () {
  loginPage = new LoginPage(this.page);
  adminPage = new AdminPage(this.page);

  await loginPage.open();
  await loginPage.loginAsAdmin();
  await loginPage.verifyAdminMenu();
});

When('user clicks Admin menu', async function () {
  await loginPage.clickAdmin();
});

When('user adds user if not exists', async function () {
  await adminPage.openAdmin();
  await adminPage.searchUser(userData.username);

  const exists = await adminPage.isUserPresent(userData.username);

  if (!exists) {
    console.log('User not found → creating user');
    await adminPage.addUser(userData);
  } else {
    console.log('User already exists → skipping creation');
  }
});

Then('user should see the user in system users list', async function () {
  await adminPage.searchUser(userData.username);
  await adminPage.verifyUserExists(userData.username);
});

Then('user logs out', async function () {
  await adminPage.logout();
});
