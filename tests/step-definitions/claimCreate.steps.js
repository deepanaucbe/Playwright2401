const { Given, When, Then } = require('@cucumber/cucumber');
const ClaimCreatePage = require('../pages/claimCreate.page');

let claimPage;
let claimCreated = false;

Given('I logged into OrangeHRM', async function () {
  claimPage = new ClaimCreatePage(this.page);
  await claimPage.openApp();
  await claimPage.login();
});

When('I navigate to Claim page', async function () {
  await claimPage.goToClaim();
});

When('I search employee by employee id for claim', async function () {
  await claimPage.searchEmployee();
});

Then('I create claim if employee exists otherwise logout immediately', async function () {
  claimCreated = await claimPage.createClaimOrLogout();
});

Then('I submit the created claim', async function () {
  if (claimCreated) {
    await claimPage.submitClaim();
  }
});

Then('I logout from application after claim', async function () {
  const claimPage = new ClaimCreatePage(this.page);
  await claimPage.logout();
});
