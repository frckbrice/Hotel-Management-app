import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');

    // Check if page title is correct
    await expect(page).toHaveTitle(/Hotel booking App/i);

    // Check if main sections are present
    await expect(
      page.getByRole('heading', { name: /Explore Our Exquisite Hotel/i })
    ).toBeVisible();
    await expect(
      page.getByText(/Experience an Exquisite Hotel/i)
    ).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');

    // Check if all navigation links are present
    await expect(page.getByRole('link', { name: /Home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Rooms/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Gallery/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Contact/i })).toBeVisible();
  });

  test('should have logo and branding', async ({ page }) => {
    await page.goto('/');

    // Check if logo is present in header (more specific)
    const header = page.locator('header');
    await expect(header.getByText('HotelMT')).toBeVisible();
  });

  test('should have authentication button', async ({ page }) => {
    await page.goto('/');

    // Check if sign in button is present
    await expect(page.getByText('Sign In')).toBeVisible();
  });
});
