import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import AuthForms from '@/components/auth/auth-forms';

// Mock NextAuth
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

// Mock Next.js router
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    query: {},
    pathname: '/auth',
  }),
}));

// Mock theme context
vi.mock('@/app/themeProvider/ThemeProvider', () => ({
  useThemeContext: () => ({
    darkTheme: false,
    setDarkTheme: vi.fn(),
  }),
}));

describe('Authentication Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('AuthForms Component', () => {
    it('should render login form by default', () => {
      (useSession as any).mockReturnValue({
        data: null,
        status: 'unauthenticated',
      });

      render(<AuthForms />);

      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /sign in/i })
      ).toBeInTheDocument();
    });

    it('should render register form when register tab is clicked', () => {
      (useSession as any).mockReturnValue({
        data: null,
        status: 'unauthenticated',
      });

      render(<AuthForms />);

      const registerTab = screen.getByText('Register');
      fireEvent.click(registerTab);

      expect(screen.getByText('Create Account')).toBeInTheDocument();
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /register/i })
      ).toBeInTheDocument();
    });

    it('should show validation errors for empty fields', async () => {
      (useSession as any).mockReturnValue({
        data: null,
        status: 'unauthenticated',
      });

      render(<AuthForms />);

      const signInButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(signInButton);

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
    });

    it('should show validation error for invalid email', async () => {
      (useSession as any).mockReturnValue({
        data: null,
        status: 'unauthenticated',
      });

      render(<AuthForms />);

      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      const signInButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(signInButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      });
    });

    it('should show validation error for short password', async () => {
      (useSession as any).mockReturnValue({
        data: null,
        status: 'unauthenticated',
      });

      render(<AuthForms />);

      const passwordInput = screen.getByLabelText(/password/i);
      fireEvent.change(passwordInput, { target: { value: '123' } });

      const signInButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(signInButton);

      await waitFor(() => {
        expect(
          screen.getByText(/password must be at least 6 characters/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Authentication State', () => {
    it('should show loading state when session is loading', () => {
      (useSession as any).mockReturnValue({
        data: null,
        status: 'loading',
      });

      render(<AuthForms />);

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('should redirect when user is already authenticated', () => {
      (useSession as any).mockReturnValue({
        data: {
          user: {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
          },
        },
        status: 'authenticated',
      });

      render(<AuthForms />);

      // Should redirect to dashboard or home
      expect(screen.getByText(/redirecting/i)).toBeInTheDocument();
    });
  });
});
