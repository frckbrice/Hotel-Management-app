import { test, expect } from "@playwright/test";

test.describe("Rooms Page", () => {
  test("should load rooms page successfully", async ({ page }) => {
    await page.goto("/rooms");

    // Check if page title is correct
    await expect(page).toHaveTitle(/Rooms/i);

    // Check if main sections are present
    await expect(
      page.getByRole("heading", { name: /Our Rooms/i }),
    ).toBeVisible();
  });

  test("should display room cards", async ({ page }) => {
    await page.goto("/rooms");

    // Check if room cards are present
    await expect(page.locator('[data-testid="room-card"]')).toBeVisible();
  });

  test("should filter rooms by amenities", async ({ page }) => {
    await page.goto("/rooms");

    // Click on WiFi filter
    await page.getByRole("button", { name: /WiFi/i }).click();

    // Check if filtered results are shown
    await expect(page.locator('[data-testid="room-card"]')).toBeVisible();
  });

  test("should search rooms by name", async ({ page }) => {
    await page.goto("/rooms");

    // Type in search box
    await page.getByPlaceholder(/search rooms/i).fill("Luxury");

    // Check if search results are shown
    await expect(page.locator('[data-testid="room-card"]')).toBeVisible();
  });

  test("should sort rooms by price", async ({ page }) => {
    await page.goto("/rooms");

    // Click on sort dropdown
    await page.getByRole("button", { name: /sort/i }).click();

    // Select price low to high
    await page.getByRole("option", { name: /price low to high/i }).click();

    // Check if rooms are sorted
    await expect(page.locator('[data-testid="room-card"]')).toBeVisible();
  });

  test("should navigate to room details", async ({ page }) => {
    await page.goto("/rooms");

    // Click on first room card
    await page.locator('[data-testid="room-card"]').first().click();

    // Check if redirected to room details page
    await expect(page).toHaveURL(/\/rooms\/.+/);
  });

  test("should show room availability", async ({ page }) => {
    await page.goto("/rooms");

    // Check if availability status is shown
    await expect(
      page.locator('[data-testid="availability-status"]'),
    ).toBeVisible();
  });

  test("should display room prices correctly", async ({ page }) => {
    await page.goto("/rooms");

    // Check if price is displayed
    await expect(page.locator('[data-testid="room-price"]')).toBeVisible();
  });

  test("should show room amenities", async ({ page }) => {
    await page.goto("/rooms");

    // Check if amenities are displayed
    await expect(page.locator('[data-testid="room-amenities"]')).toBeVisible();
  });
});

test.describe("Room Details Page", () => {
  test("should load room details page", async ({ page }) => {
    await page.goto("/rooms/luxury-suite");

    // Check if room details are displayed
    await expect(
      page.getByRole("heading", { name: /Luxury Suite/i }),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="room-description"]'),
    ).toBeVisible();
  });

  test("should display room images gallery", async ({ page }) => {
    await page.goto("/rooms/luxury-suite");

    // Check if image gallery is present
    await expect(page.locator('[data-testid="room-gallery"]')).toBeVisible();
  });

  test("should show booking form", async ({ page }) => {
    await page.goto("/rooms/luxury-suite");

    // Check if booking form is present
    await expect(page.locator('[data-testid="booking-form"]')).toBeVisible();
  });

  test("should allow date selection", async ({ page }) => {
    await page.goto("/rooms/luxury-suite");

    // Click on check-in date
    await page.locator('[data-testid="checkin-date"]').click();

    // Select a date
    await page.getByRole("button", { name: "15" }).click();

    // Check if date is selected
    await expect(page.locator('[data-testid="checkin-date"]')).toHaveValue(
      /2024-01-15/,
    );
  });

  test("should calculate total price", async ({ page }) => {
    await page.goto("/rooms/luxury-suite");

    // Select dates
    await page.locator('[data-testid="checkin-date"]').click();
    await page.getByRole("button", { name: "15" }).click();

    await page.locator('[data-testid="checkout-date"]').click();
    await page.getByRole("button", { name: "17" }).click();

    // Check if total price is calculated
    await expect(page.locator('[data-testid="total-price"]')).toBeVisible();
  });

  test("should show room reviews", async ({ page }) => {
    await page.goto("/rooms/luxury-suite");

    // Check if reviews section is present
    await expect(page.locator('[data-testid="reviews-section"]')).toBeVisible();
  });

  test("should allow adding reviews", async ({ page }) => {
    await page.goto("/rooms/luxury-suite");

    // Click on add review button
    await page.getByRole("button", { name: /add review/i }).click();

    // Check if review form is shown
    await expect(page.locator('[data-testid="review-form"]')).toBeVisible();
  });
});
