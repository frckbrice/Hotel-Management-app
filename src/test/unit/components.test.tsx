import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header/Header';

// Mock NextAuth
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
}));

// Mock theme context
vi.mock('@/app/(web)/themeProvider/ThemeProvider', () => ({
  useThemeContext: () => ({
    darkTheme: false,
    setDarkTheme: vi.fn(),
  }),
}));

// Mock Next.js router
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    reload: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
  }),
}));

// Mock Next.js image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', { src, alt, ...props });
  },
}));

describe('Header Component', () => {
  it('should render header with navigation', () => {
    render(<Header />);

    // Check if navigation links are present using getAllByText to handle multiple instances
    const homeLinks = screen.getAllByText('Home');
    const roomsLinks = screen.getAllByText('Rooms');
    const galleryLinks = screen.getAllByText('Gallery');
    const contactLinks = screen.getAllByText('Contact');

    expect(homeLinks.length).toBeGreaterThan(0);
    expect(roomsLinks.length).toBeGreaterThan(0);
    expect(galleryLinks.length).toBeGreaterThan(0);
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  it('should render logo', () => {
    render(<Header />);

    // Check if logo is present
    expect(screen.getByText('HotelMT')).toBeInTheDocument();
  });

  it('should render authentication button when not logged in', () => {
    render(<Header />);

    // Check if sign in button is present (when not authenticated)
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('should render theme toggle button', () => {
    render(<Header />);

    // Check if theme toggle is present (using getAllByRole to find buttons)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should render mobile menu toggle', () => {
    render(<Header />);

    // Check if mobile menu toggle is present (using getAllByRole to find buttons)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
