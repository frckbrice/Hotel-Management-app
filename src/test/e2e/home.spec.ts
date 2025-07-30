import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');

    // Check if page title is correct
    await expect(page).toHaveTitle(/Hotel Management/i);

    // Check if main sections are present
    await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
    await expect(page.getByText(/featured room/i)).toBeVisible();
  });

  test('should navigate to rooms page', async ({ page }) => {
    await page.goto('/');

    // Click on rooms link
    await page.getByRole('link', { name: /rooms/i }).click();

    // Check if we're on the rooms page
    await expect(page).toHaveURL(/.*rooms/);
  });

  test('should navigate to gallery page', async ({ page }) => {
    await page.goto('/');

    // Click on gallery link
    await page.getByRole('link', { name: /gallery/i }).click();

    // Check if we're on the gallery page
    await expect(page).toHaveURL(/.*gallery/);
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/');

    // Click on contact link
    await page.getByRole('link', { name: /contact/i }).click();

    // Check if we're on the contact page
    await expect(page).toHaveURL(/.*contact/);
  });
});
