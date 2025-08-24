import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSession } from "next-auth/react";
import AuthForms from "@/components/pages/auth/auth-forms";

// Mock NextAuth
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

// Mock Next.js navigation (App Router)
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn((param: string) => {
      if (param === "callbackUrl") return "/";
      return null;
    }),
    has: vi.fn(),
    forEach: vi.fn(),
    entries: vi.fn(),
    keys: vi.fn(),
    values: vi.fn(),
  }),
}));

// Mock theme context
vi.mock("@/app/themeProvider/ThemeProvider", () => ({
  default: {
    useThemeContext: () => ({
      darkTheme: false,
      setDarkTheme: vi.fn(),
    }),
  },
}));

describe("Authentication Components", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("AuthForms Component", () => {
    it("should render register form by default", () => {
      (useSession as any).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });

      render(<AuthForms />);

      expect(screen.getByText("Create an Account")).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/name@company\.com/i),
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /sign up/i }),
      ).toBeInTheDocument();
    });

    it("should render login form when login tab is clicked", () => {
      (useSession as any).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });

      render(<AuthForms />);

      const loginTab = screen.getByText("Already have an account? Login");
      fireEvent.click(loginTab);

      const signInElements = screen.getAllByText("Sign In");
      expect(signInElements.length).toBeGreaterThan(0);
      expect(
        screen.getByPlaceholderText(/name@company\.com/i),
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /sign in/i }),
      ).toBeInTheDocument();
    });

    it("should handle form submission", async () => {
      (useSession as any).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });

      render(<AuthForms />);

      const signUpButton = screen.getByRole("button", { name: /sign up/i });
      fireEvent.click(signUpButton);

      // Form should still be visible after submission attempt
      expect(screen.getByText("Create an Account")).toBeInTheDocument();
    });

    it("should handle input changes", () => {
      (useSession as any).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });

      render(<AuthForms />);

      const nameInput = screen.getByPlaceholderText(/your name/i);
      const emailInput = screen.getByPlaceholderText(/name@company\.com/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });

      expect(nameInput).toHaveValue("John Doe");
      expect(emailInput).toHaveValue("john@example.com");
      expect(passwordInput).toHaveValue("password123");
    });
  });

  describe("Authentication State", () => {
    it("should handle authenticated user", () => {
      (useSession as any).mockReturnValue({
        data: {
          user: {
            id: "1",
            name: "Test User",
            email: "test@example.com",
          },
        },
        status: "authenticated",
      });

      render(<AuthForms />);

      // Should show welcome message for authenticated user
      expect(screen.getByText("Welcome back, Test User!")).toBeInTheDocument();
    });
  });
});
