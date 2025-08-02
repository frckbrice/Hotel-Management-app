import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RoomCard from "../../components/pages/Room/RoomCard/RoomCard";

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
}));

// Mock Next.js image
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement("img", { src, alt, ...props });
  },
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

const mockRoom = {
  _id: "1",
  coverImage: { url: "/test-image.jpg" },
  description: "A beautiful luxury suite with amazing views",
  dimension: "50m²",
  discount: 0,
  images: [{ _key: "1", url: "/test-image.jpg" }],
  isBooked: false,
  isFeatured: true,
  name: "Luxury Suite",
  numberOfBeds: 1,
  offeredAmenities: [
    { _key: "1", amenity: "WiFi", icon: "wifi" },
    { _key: "2", amenity: "Pool", icon: "pool" },
    { _key: "3", amenity: "Spa", icon: "spa" },
  ],
  price: 299,
  slug: { _type: "slug", current: "luxury-suite" },
  specialNote: "Free cancellation",
  type: "Suite",
};

describe("RoomCard Component", () => {
  it("should render room information correctly", () => {
    render(<RoomCard room={mockRoom} />);

    // Use getAllByText to handle multiple elements with same text
    const luxurySuiteElements = screen.getAllByText("Luxury Suite");
    expect(luxurySuiteElements.length).toBeGreaterThan(0);
    expect(
      screen.getByText("A beautiful luxury suite with amazing views..."),
    ).toBeInTheDocument();
    expect(screen.getByText("$299")).toBeInTheDocument();
  });

  it("should display room type badge", () => {
    render(<RoomCard room={mockRoom} />);

    const suiteRoomElements = screen.getAllByText("Suite Room");
    expect(suiteRoomElements.length).toBeGreaterThan(0);
  });

  it("should have a book now link", () => {
    render(<RoomCard room={mockRoom} />);

    expect(screen.getByRole("link", { name: /book now/i })).toBeInTheDocument();
  });

  it("should have correct link href", () => {
    render(<RoomCard room={mockRoom} />);

    const bookNowLink = screen.getByRole("link", { name: /book now/i });
    expect(bookNowLink).toHaveAttribute("href", "/rooms/luxury-suite");
  });

  it("should handle booked room", () => {
    const bookedRoom = { ...mockRoom, isBooked: true };
    render(<RoomCard room={bookedRoom} />);

    expect(screen.getByText("Booked")).toBeInTheDocument();
    expect(screen.getByText("Unavailable")).toBeInTheDocument();
  });

  it("should handle room without amenities", () => {
    const roomWithoutAmenities = { ...mockRoom, offeredAmenities: [] };
    render(<RoomCard room={roomWithoutAmenities} />);

    // Room should still render without amenities
    const luxurySuiteElements = screen.getAllByText("Luxury Suite");
    expect(luxurySuiteElements.length).toBeGreaterThan(0);
  });

  it("should display room image with alt text", () => {
    render(<RoomCard room={mockRoom} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/test-image.jpg");
    expect(image).toHaveAttribute("alt", "Luxury Suite");
  });
});
