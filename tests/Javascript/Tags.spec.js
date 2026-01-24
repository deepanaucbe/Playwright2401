import{test,expect}from"@playwright/test"

test("Test - 1 @reg1", async ({ page }) => {
  console.log("Test - 1");
});

test("Test - 2 @sanity", async ({ page }) => {
  console.log("Test - 2");
});

test("Test - 3 @reg @sanity", async ({ page }) => {
  console.log("Test - 3");
});

test("Test - 4 @smoke", async ({ page }) => {
  console.log("Test - 4");
});
