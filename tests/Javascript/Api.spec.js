import { test, expect } from "@playwright/test";

test("API GET", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users?page=2");

  expect(response.status()).toBe(200);

  const responseBody = await response.json(); // ✅ await is REQUIRED
  console.log(responseBody);
});
