import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test('should complete booking process', async ({ page }) => {
    await page.goto('/rooms/luxury-suite');

    // Select dates
    await page.locator('[data-testid="checkin-date"]').click();
    await page.getByRole('button', { name: '15' }).click();

    await page.locator('[data-testid="checkout-date"]').click();
    await page.getByRole('button', { name: '17' }).click();

    // Fill guest information
    await page.locator('[data-testid="adults-input"]').fill('2');
    await page.locator('[data-testid="children-input"]').fill('1');

    // Click book now button
    await page.getByRole('button', { name: /book now/i }).click();

    // Check if redirected to booking confirmation
    await expect(page).toHaveURL(/\/booking\/confirmation/);
  });

  test('should validate booking form', async ({ page }) => {
    await page.goto('/rooms/luxury-suite');

    // Try to book without selecting dates
    await page.getByRole('button', { name: /book now/i }).click();

    // Check if validation error is shown
    await expect(page.getByText(/please select dates/i)).toBeVisible();
  });

  test('should calculate booking total correctly', async ({ page }) => {
    await page.goto('/rooms/luxury-suite');

    // Select dates for 2 nights
    await page.locator('[data-testid="checkin-date"]').click();
    await page.getByRole('button', { name: '15' }).click();

    await page.locator('[data-testid="checkout-date"]').click();
    await page.getByRole('button', { name: '17' }).click();

    // Check if total is calculated correctly (299 * 2 = 598)
    await expect(page.locator('[data-testid="total-price"]')).toContainText(
      '598'
    );
  });

  test('should apply discounts', async ({ page }) => {
    await page.goto('/rooms/luxury-suite');

    // Apply discount code
    await page.locator('[data-testid="discount-code"]').fill('SAVE10');
    await page.getByRole('button', { name: /apply/i }).click();

    // Check if discount is applied
    await expect(page.locator('[data-testid="discount-amount"]')).toBeVisible();
  });

  test('should handle payment process', async ({ page }) => {
    await page.goto('/rooms/luxury-suite');

    // Complete booking form
    await page.locator('[data-testid="checkin-date"]').click();
    await page.getByRole('button', { name: '15' }).click();

    await page.locator('[data-testid="checkout-date"]').click();
    await page.getByRole('button', { name: '17' }).click();

    await page.getByRole('button', { name: /book now/i }).click();

    // Fill payment information
    await page.locator('[data-testid="card-number"]').fill('4242424242424242');
    await page.locator('[data-testid="expiry-date"]').fill('12/25');
    await page.locator('[data-testid="cvc"]').fill('123');

    // Submit payment
    await page.getByRole('button', { name: /pay/i }).click();

    // Check if payment is successful
    await expect(page.getByText(/payment successful/i)).toBeVisible();
  });

  test('should show booking confirmation', async ({ page }) => {
    await page.goto('/booking/confirmation');

    // Check if confirmation details are shown
    await expect(page.getByText(/booking confirmed/i)).toBeVisible();
    await expect(page.locator('[data-testid="booking-id"]')).toBeVisible();
    await expect(page.locator('[data-testid="booking-dates"]')).toBeVisible();
  });

  test('should allow booking cancellation', async ({ page }) => {
    await page.goto('/users/1');

    // Click on cancel booking button
    await page
      .getByRole('button', { name: /cancel booking/i })
      .first()
      .click();

    // Confirm cancellation
    await page.getByRole('button', { name: /confirm/i }).click();

    // Check if booking is cancelled
    await expect(page.getByText(/booking cancelled/i)).toBeVisible();
  });

  test('should show booking history', async ({ page }) => {
    await page.goto('/users/1');

    // Check if booking history is displayed
    await expect(page.locator('[data-testid="booking-history"]')).toBeVisible();
  });

  test('should handle booking modifications', async ({ page }) => {
    await page.goto('/users/1');

    // Click on modify booking button
    await page
      .getByRole('button', { name: /modify booking/i })
      .first()
      .click();

    // Change dates
    await page.locator('[data-testid="checkin-date"]').click();
    await page.getByRole('button', { name: '20' }).click();

    // Save changes
    await page.getByRole('button', { name: /save changes/i }).click();

    // Check if booking is updated
    await expect(page.getByText(/booking updated/i)).toBeVisible();
  });
});

test.describe('Payment Integration', () => {
  test('should handle successful payment', async ({ page }) => {
    await page.goto('/booking/payment');

    // Fill valid payment details
    await page.locator('[data-testid="card-number"]').fill('4242424242424242');
    await page.locator('[data-testid="expiry-date"]').fill('12/25');
    await page.locator('[data-testid="cvc"]').fill('123');

    await page.getByRole('button', { name: /pay/i }).click();

    // Check success
    await expect(page.getByText(/payment successful/i)).toBeVisible();
  });

  test('should handle failed payment', async ({ page }) => {
    await page.goto('/booking/payment');

    // Fill invalid payment details
    await page.locator('[data-testid="card-number"]').fill('4000000000000002');
    await page.locator('[data-testid="expiry-date"]').fill('12/25');
    await page.locator('[data-testid="cvc"]').fill('123');

    await page.getByRole('button', { name: /pay/i }).click();

    // Check error
    await expect(page.getByText(/payment failed/i)).toBeVisible();
  });

  test('should validate payment form', async ({ page }) => {
    await page.goto('/booking/payment');

    // Try to submit without filling form
    await page.getByRole('button', { name: /pay/i }).click();

    // Check validation errors
    await expect(page.getByText(/card number is required/i)).toBeVisible();
    await expect(page.getByText(/expiry date is required/i)).toBeVisible();
    await expect(page.getByText(/cvc is required/i)).toBeVisible();
  });
});
