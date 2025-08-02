import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RoomCard from '@/components/RoomCard/RoomCard';

// Mock Next.js router
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: {},
  }),
}));

// Mock Next.js image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', { src, alt, ...props });
  },
}));

// Mock theme context
vi.mock('@/app/themeProvider/ThemeProvider', () => ({
  useThemeContext: () => ({
    darkTheme: false,
    setDarkTheme: vi.fn(),
  }),
}));

const mockRoom = {
  _id: '1',
  coverImage: { url: '/test-image.jpg' },
  description: 'A beautiful luxury suite with amazing views',
  dimension: '50m²',
  discount: 0,
  images: [{ _key: '1', url: '/test-image.jpg' }],
  isBooked: false,
  isFeatured: true,
  name: 'Luxury Suite',
  numberOfBeds: 1,
  offeredAmenities: [
    { _key: '1', amenity: 'WiFi', icon: 'wifi' },
    { _key: '2', amenity: 'Pool', icon: 'pool' },
    { _key: '3', amenity: 'Spa', icon: 'spa' },
  ],
  price: 299,
  slug: { _type: 'slug', current: 'luxury-suite' },
  specialNote: 'Free cancellation',
  type: 'Suite',
};

describe('RoomCard Component', () => {
  it('should render room information correctly', () => {
    render(<RoomCard room={mockRoom} />);

    expect(screen.getByText('Luxury Suite')).toBeInTheDocument();
    expect(
      screen.getByText('A beautiful luxury suite with amazing views')
    ).toBeInTheDocument();
    expect(screen.getByText('$299')).toBeInTheDocument();
  });

  it('should display room amenities', () => {
    render(<RoomCard room={mockRoom} />);

    expect(screen.getByText('WiFi')).toBeInTheDocument();
    expect(screen.getByText('Pool')).toBeInTheDocument();
    expect(screen.getByText('Spa')).toBeInTheDocument();
  });

  it('should display room details', () => {
    render(<RoomCard room={mockRoom} />);

    expect(screen.getByText('50m²')).toBeInTheDocument();
    expect(screen.getByText('1 bed')).toBeInTheDocument();
  });

  it('should show special note when available', () => {
    render(<RoomCard room={mockRoom} />);

    expect(screen.getByText('Free cancellation')).toBeInTheDocument();
  });

  it('should show room type', () => {
    render(<RoomCard room={mockRoom} />);

    expect(screen.getByText('Suite')).toBeInTheDocument();
  });

  it('should have a book now button', () => {
    render(<RoomCard room={mockRoom} />);

    expect(
      screen.getByRole('button', { name: /book now/i })
    ).toBeInTheDocument();
  });

  it('should have a view details link', () => {
    render(<RoomCard room={mockRoom} />);

    expect(
      screen.getByRole('link', { name: /view details/i })
    ).toBeInTheDocument();
  });

  it('should handle room without special note', () => {
    const roomWithoutNote = { ...mockRoom, specialNote: '' };
    render(<RoomCard room={roomWithoutNote} />);

    expect(screen.queryByText('Free cancellation')).not.toBeInTheDocument();
  });

  it('should handle room without amenities', () => {
    const roomWithoutAmenities = { ...mockRoom, offeredAmenities: [] };
    render(<RoomCard room={roomWithoutAmenities} />);

    expect(screen.queryByText('WiFi')).not.toBeInTheDocument();
  });

  it('should display room image with alt text', () => {
    render(<RoomCard room={mockRoom} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Luxury Suite');
  });

  it('should handle click on book now button', () => {
    const mockPush = vi.fn();
    vi.mocked(require('next/router').useRouter).mockReturnValue({
      push: mockPush,
      query: {},
    });

    render(<RoomCard room={mockRoom} />);

    const bookNowButton = screen.getByRole('button', { name: /book now/i });
    fireEvent.click(bookNowButton);

    expect(mockPush).toHaveBeenCalledWith('/rooms/1');
  });

  it('should handle click on view details link', () => {
    render(<RoomCard room={mockRoom} />);

    const viewDetailsLink = screen.getByRole('link', { name: /view details/i });
    expect(viewDetailsLink).toHaveAttribute('href', '/rooms/1');
  });
});
