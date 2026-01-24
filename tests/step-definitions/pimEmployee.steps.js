const { Given, When, Then } = require('@cucumber/cucumber');
const PimPage = require('../pages/PimPage');
const config = require('../config/testConfig');
const { pimEmployee: employee } = require('../config/testConfig');

let pimPage;

Given('I am logged into OrangeHRM', async function () {
  pimPage = new PimPage(this.page);
  await pimPage.loginToOrangeHRM(config);
});

When('I navigate to PIM employee list', async function () {
  await pimPage.goToPIM();
});

When(
  'I search employee by employee name {string}',
  async function (employeeName) {
    console.log(`Searching employee: ${employeeName}`);
  }
);

Then(
  'I verify employee details or create new employee and logout',
  async function () {
    await pimPage.verifyOrCreateEmployeeAndLogout(employee);
  }
);
