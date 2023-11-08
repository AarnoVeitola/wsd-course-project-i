const { test, expect } = require("@playwright/test");

test("The main page has the title 'Shared shopping lists'", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Shared shopping lists");
});

test("The main page has a link to the page '/lists' with the text 'Lists'", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("a >> text='Lists'")).toHaveText("Lists");
  await page.locator("a >> text='Lists'").click();
  await expect(page).toHaveURL("/lists");
});

test("The 'Lists' page has a link back to the main page with the text 'Main page'", async ({ page }) => {
  await page.goto("/lists");
  await expect(page.locator("a >> text='Main page'")).toHaveText("Main page");
  await page.locator("a >> text='Main page'").click();
  await expect(page).toHaveURL("/");
});

test("Can create and deactivate a shopping list", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;

  // Creating a list and checking that it is shown
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit][value='Create list!']").click();
  await expect(page.locator("ul")).toContainText(listName);

  // Deactivating a list and checking that it is not shown
  await page.locator("li").filter({ hasText: `${listName} Deactivate list!` }).getByRole('button').click();
  await expect(page.locator("ul")).not.toContainText(listName);
});

test("Can add an item and mark it as collected", async ({ page }) => {
  await page.goto("/lists");
  const listName = `My list: ${Math.random()}`;
  const itemName = `Item: ${Math.random()}`;

  // Creating a list
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit][value='Create list!']").click();
  await page.locator(`a >> text='${listName}'`).click();
  
  // Adding an item and checking that it is shown
  await page.locator("input[type=text]").type(itemName);
  await page.locator("input[type=submit][value='Add an item!']").click();
  await expect(page.locator(`li >> '${itemName}'`)).toContainText(itemName);

  // Marking an item as collected and checking that it is inside a "del" element
  await page.locator("input[type=submit][value='Mark as collected!']").click();
  await expect(page.locator(`del >> '${itemName}'`)).toHaveText(itemName);
});