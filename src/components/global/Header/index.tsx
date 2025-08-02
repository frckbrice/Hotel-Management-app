"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useThemeContext } from "@/context/theme/ThemeProvider";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

type Props = {};

const Header = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Always call hooks, but handle undefined context
  const themeContext = useThemeContext();
  const { darkTheme = false, setDarkTheme = () => {} } = themeContext || {};

  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    try {
      // Close the dropdown first
      setIsUserMenuOpen(false);

      // Clear any local session data
      localStorage.removeItem("next-auth.session-token");
      localStorage.removeItem("next-auth.csrf-token");

      // Sign out with proper configuration
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });

      // Force a page reload to ensure session is cleared
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback: force redirect to home page and reload
      window.location.href = "/";
    }
  };

  const toggleTheme = () => {
    if (isMounted && setDarkTheme) {
      setDarkTheme(!darkTheme);
      if (darkTheme) {
        localStorage.removeItem("hotel-theme");
      } else {
        localStorage.setItem("hotel-theme", "true");
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      mobileMenuButtonRef.current?.focus();
    }
  };

  // Handle click outside mobile menu and user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    if (isMobileMenuOpen || isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, isUserMenuOpen]);

  // Focus management for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      const firstLink = mobileMenuRef.current?.querySelector("a");
      firstLink?.focus();
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: "/", label: "Home", description: "Navigate to the home page" },
    {
      href: "/rooms",
      label: "Rooms",
      description: "Browse available hotel rooms",
    },
    {
      href: "/gallery",
      label: "Gallery",
      description: "View hotel photos and amenities",
    },
    { href: "/contact", label: "Contact", description: "Get in touch with us" },
  ];

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <span className="font-black bg-gradient-to-r from-green-600 to-green-700 text-transparent bg-clip-text text-4xl">
                HotelMT
              </span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20"
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section - Left */}
          <div className="flex items-center">
            <Link
              href="/"
              className="group relative focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg p-1"
              aria-label="HotelMT - Go to homepage"
            >
              <span className="font-black bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-transparent bg-clip-text text-4xl">
                HotelMT
              </span>
              <div
                className="absolute -bottom-1 left-0 w-0 h-0.5"
                style={{
                  background:
                    "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))",
                }}
              ></div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav
            className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group px-3 py-2 text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 hover:text-green-600 dark:hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg"
                aria-label={item.description}
              >
                {item.label}
                <div
                  className="absolute -bottom-2 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))",
                  }}
                ></div>
              </Link>
            ))}
          </nav>

          {/* Right Section - User & Theme Controls */}
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <div className="relative" ref={userMenuRef}>
              {session?.user ? (
                <>
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    aria-label={`User menu for ${session.user.name || "user"}`}
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                    type="button"
                  >
                    {session.user.image ? (
                      <div
                        className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-transparent transition-all duration-300"
                        style={
                          { "--tw-ring-color": "hsl(var(--primary))" } as any
                        }
                      >
                        <Image
                          src={session.user.image}
                          alt={`Profile picture of ${session.user.name || "user"}`}
                          width={40}
                          height={40}
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))",
                        }}
                        aria-hidden="true"
                      >
                        <FaUserCircle className="text-white" size={24} />
                      </div>
                    )}
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 z-50"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <div className="py-1">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {session.user.name || "User"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {session.user.email}
                          </p>
                        </div>

                        {/* Profile Link */}
                        <Link
                          href={`/users/${session.user.id}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                          onClick={() => setIsUserMenuOpen(false)}
                          role="menuitem"
                        >
                          <FaUser className="mr-3" size={14} />
                          Profile
                        </Link>

                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
                          role="menuitem"
                          type="button"
                        >
                          <FaSignOutAlt className="mr-3" size={14} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/auth"
                  className="group flex items-center space-x-2 px-4 py-2 text-white rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  style={{
                    background:
                      "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))",
                  }}
                  aria-label="Sign in to your account"
                >
                  <FaUserCircle size={20} aria-hidden="true" />
                  <span className="hidden sm:inline font-medium">Sign In</span>
                </Link>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              ref={themeButtonRef}
              onClick={toggleTheme}
              className="relative p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label={`Switch to ${darkTheme ? "light" : "dark"} mode`}
              aria-pressed={darkTheme}
            >
              <div className="relative z-10">
                {darkTheme ? (
                  <MdOutlineLightMode
                    className="text-yellow-500 group-hover:rotate-12 transition-transform duration-300"
                    size={24}
                    aria-hidden="true"
                  />
                ) : (
                  <MdDarkMode
                    className="text-gray-700 group-hover:-rotate-12 transition-transform duration-300"
                    size={24}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              ref={mobileMenuButtonRef}
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label={`${isMobileMenuOpen ? "Close" : "Open"} mobile navigation menu`}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes
                  className="text-gray-700 dark:text-gray-300"
                  size={24}
                  aria-hidden="true"
                />
              ) : (
                <FaBars
                  className="text-gray-700 dark:text-gray-300"
                  size={24}
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-64 opacity-100 pb-6"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
          role="navigation"
          aria-label="Mobile navigation"
          onKeyDown={handleKeyDown}
        >
          <nav className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                style={{ animationDelay: `${index * 50}ms` }}
                aria-label={item.description}
              >
                <span className="group-hover:translate-x-2 transition-transform duration-300">
                  {item.label}
                </span>
                <div
                  className="ml-auto w-0 h-0.5 group-hover:w-6 transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))",
                  }}
                ></div>
              </Link>
            ))}

            {/* Mobile User Menu */}
            {session?.user && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {session.user.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {session.user.email}
                    </p>
                  </div>
                  <Link
                    href={`/users/${session.user.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <FaUser className="mr-3" size={16} />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-red-600 dark:text-red-400 font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                  >
                    <FaSignOutAlt className="mr-3" size={16} />
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
