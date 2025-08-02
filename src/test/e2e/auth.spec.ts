import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test("should load auth page", async ({ page }) => {
    await page.goto("/auth");

    // Check if auth page loads correctly
    await expect(page).toHaveTitle(/Sign In/i);
    await expect(page.getByRole("heading", { name: /Sign In/i })).toBeVisible();
  });

  test("should switch between login and register tabs", async ({ page }) => {
    await page.goto("/auth");

    // Check if login form is visible by default
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();

    // Click on register tab
    await page.getByRole("tab", { name: /register/i }).click();

    // Check if register form is visible
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test("should validate login form", async ({ page }) => {
    await page.goto("/auth");

    // Try to submit empty form
    await page.getByRole("button", { name: /sign in/i }).click();

    // Check validation errors
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test("should validate register form", async ({ page }) => {
    await page.goto("/auth");

    // Switch to register tab
    await page.getByRole("tab", { name: /register/i }).click();

    // Try to submit empty form
    await page.getByRole("button", { name: /register/i }).click();

    // Check validation errors
    await expect(page.getByText(/name is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test("should validate email format", async ({ page }) => {
    await page.goto("/auth");

    // Enter invalid email
    await page.getByLabel(/email/i).fill("invalid-email");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Check validation error
    await expect(page.getByText(/invalid email address/i)).toBeVisible();
  });

  test("should validate password length", async ({ page }) => {
    await page.goto("/auth");

    // Enter short password
    await page.getByLabel(/password/i).fill("123");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Check validation error
    await expect(
      page.getByText(/password must be at least 6 characters/i),
    ).toBeVisible();
  });

  test("should handle successful login", async ({ page }) => {
    await page.goto("/auth");

    // Fill valid credentials
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/password/i).fill("password123");

    // Mock successful login
    await page.route("**/api/auth/signin", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.getByRole("button", { name: /sign in/i }).click();

    // Check if redirected to dashboard
    await expect(page).toHaveURL(/\/users\/\d+/);
  });

  test("should handle failed login", async ({ page }) => {
    await page.goto("/auth");

    // Fill invalid credentials
    await page.getByLabel(/email/i).fill("wrong@example.com");
    await page.getByLabel(/password/i).fill("wrongpassword");

    // Mock failed login
    await page.route("**/api/auth/signin", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ error: "Invalid credentials" }),
      });
    });

    await page.getByRole("button", { name: /sign in/i }).click();

    // Check error message
    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  });

  test("should handle successful registration", async ({ page }) => {
    await page.goto("/auth");

    // Switch to register tab
    await page.getByRole("tab", { name: /register/i }).click();

    // Fill registration form
    await page.getByLabel(/name/i).fill("John Doe");
    await page.getByLabel(/email/i).fill("john@example.com");
    await page.getByLabel(/password/i).fill("password123");

    // Mock successful registration
    await page.route("**/api/auth/signup", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.getByRole("button", { name: /register/i }).click();

    // Check if redirected to dashboard
    await expect(page).toHaveURL(/\/users\/\d+/);
  });

  test("should handle registration with existing email", async ({ page }) => {
    await page.goto("/auth");

    // Switch to register tab
    await page.getByRole("tab", { name: /register/i }).click();

    // Fill form with existing email
    await page.getByLabel(/name/i).fill("John Doe");
    await page.getByLabel(/email/i).fill("existing@example.com");
    await page.getByLabel(/password/i).fill("password123");

    // Mock registration failure
    await page.route("**/api/auth/signup", async (route) => {
      await route.fulfill({
        status: 409,
        contentType: "application/json",
        body: JSON.stringify({ error: "Email already exists" }),
      });
    });

    await page.getByRole("button", { name: /register/i }).click();

    // Check error message
    await expect(page.getByText(/email already exists/i)).toBeVisible();
  });

  test("should handle OAuth login", async ({ page }) => {
    await page.goto("/auth");

    // Click on Google login button
    await page.getByRole("button", { name: /sign in with google/i }).click();

    // Check if redirected to Google OAuth
    await expect(page).toHaveURL(/accounts\.google\.com/);
  });

  test("should handle OAuth login with GitHub", async ({ page }) => {
    await page.goto("/auth");

    // Click on GitHub login button
    await page.getByRole("button", { name: /sign in with github/i }).click();

    // Check if redirected to GitHub OAuth
    await expect(page).toHaveURL(/github\.com/);
  });

  test("should show loading state during authentication", async ({ page }) => {
    await page.goto("/auth");

    // Fill form
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/password/i).fill("password123");

    // Mock slow response
    await page.route("**/api/auth/signin", async (route) => {
      await page.waitForTimeout(2000);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.getByRole("button", { name: /sign in/i }).click();

    // Check if loading state is shown
    await expect(page.getByText(/loading/i)).toBeVisible();
  });

  test("should handle logout", async ({ page }) => {
    // Mock authenticated session
    await page.goto("/users/1");

    // Click logout button
    await page.getByRole("button", { name: /logout/i }).click();

    // Check if redirected to home page
    await expect(page).toHaveURL("/");
  });

  test("should protect authenticated routes", async ({ page }) => {
    // Try to access protected route without authentication
    await page.goto("/users/1");

    // Check if redirected to auth page
    await expect(page).toHaveURL("/auth");
  });

  test("should show user profile when authenticated", async ({ page }) => {
    // Mock authenticated session
    await page.goto("/users/1");

    // Check if user profile is displayed
    await expect(page.getByText(/profile/i)).toBeVisible();
    await expect(page.locator('[data-testid="user-avatar"]')).toBeVisible();
  });
});
