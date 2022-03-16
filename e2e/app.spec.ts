import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://vue3-tailwind-task-list.vercel.app/");
});

test.describe("Task List", () => {
  test("should be able to add a new Task", async ({ page }) => {
    await expect(page.locator('[data-testid="task-card"]')).not.toContainText([
      "My first task title",
      "My first task description",
    ]);

    await page.locator("text=Add Task").click();

    await page.locator("#title").fill("My first task title");
    await page.locator("#description").fill("My first task description");

    await page.locator('[data-testid="confirm-action"]').click();

    await expect(page.locator('[data-testid="task-card"]')).toContainText([
      "My first task title",
      "My first task description",
    ]);

    await page.reload();

    await expect(page.locator('[data-testid="task-card"]')).toContainText([
      "My first task title",
      "My first task description",
    ]);
  });
});
