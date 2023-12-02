// "@playwright/test" lets you run tests on various browsers.
import { test } from "@playwright/test";

// 'page' provides methods to interact with a browser
test("test browser", async ({ page }) => {
  await page.goto("http://localhost:3000/"); // URL to open

  await page.pause(); // Pauses Script- Keeps Browser Open
});
