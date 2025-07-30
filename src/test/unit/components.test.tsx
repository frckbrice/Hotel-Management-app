import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/Header/Header';

describe('Header Component', () => {
  it('should render header with navigation', () => {
    render(<Header />);

    // Check if navigation links are present
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/rooms/i)).toBeInTheDocument();
    expect(screen.getByText(/gallery/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('should render logo', () => {
    render(<Header />);

    // Check if logo is present
    expect(screen.getByAltText(/hotel logo/i)).toBeInTheDocument();
  });

  it('should render authentication buttons', () => {
    render(<Header />);

    // Check if auth buttons are present
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });
});
