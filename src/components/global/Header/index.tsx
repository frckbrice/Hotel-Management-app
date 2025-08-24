"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useThemeContext } from "@/context/theme/ThemeProvider";
import { FaUserCircle, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserAvatar from "./user-avatar";

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Theme context
  const themeContext = useThemeContext();
  const { darkTheme = false, setDarkTheme = () => {} } = themeContext || {};

  const { data: session, status, update } = useSession();

  const toggleUserMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUserMenuOpen((prev) => !prev);
  };

  // const handleLogout = async () => {
  //   if (isLoggingOut) return;
  //   try {
  //     setIsLoggingOut(true);
  //     setIsUserMenuOpen(false);

  //     // ✅ prevent hard reload
  //     await signOut({ redirect: false });
  //     router.replace("/");

  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   } finally {
  //     // ✅ small delay to prevent avatar flicker
  //     setTimeout(() => setIsLoggingOut(false), 400);
  //   }
  // };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setIsUserMenuOpen(false);

      await signOut({ redirect: false }); // clears cookie on server
      await update(null); // clear client cache immediately

      router.push("/"); // go home
      router.refresh(); // This ensures all components get the updated session
    } finally {
      setIsLoggingOut(false);
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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const renderUserSection = () => {
    if (status === "loading" || isLoggingOut) {
      return (
        <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-700 animate-pulse" />
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.log("Session status:", status);
      console.log("Session data:", session);
    }

    if (status === "authenticated" && session?.user) {
      return (
        <>
          <button
            onClick={toggleUserMenu}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {session.user.image ? (
              <UserAvatar
                size={40}
                alt={session.user.name || "User"}
                className="inline mr-2 align-middle"
                src={session.user.image}
              />
            ) : (
              <FaUserCircle className="text-3xl text-green-600" />
            )}
          </button>
          {isUserMenuOpen && (
            <div
              ref={userMenuRef}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            >
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium">{session.user.name}</p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
              </div>
              <Link
                href={`/users/${session.user.id}`}
                onClick={() => setIsUserMenuOpen(false)}
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaUser className="inline mr-2" /> Profile
              </Link>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                {isLoggingOut ? "Signing Out..." : "Sign Out"}
              </button>
            </div>
          )}
        </>
      );
    }

    return (
      <Link
        href="/auth"
        onClick={closeMobileMenu}
        className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
      >
        <FaUserCircle className="inline mr-2" />
        {/* <UserAvatar size={24} className="inline mr-2 align-middle" /> */}
        Sign In
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link href="/" className="font-black text-4xl text-green-700">
          HotelMT
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            href="/"
            className="text-lg font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/rooms"
            className="text-lg font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            Rooms
          </Link>
          <Link
            href="/gallery"
            className="text-lg font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            Gallery
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative">{renderUserSection()}</div>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800"
          >
            {darkTheme ? (
              <MdOutlineLightMode size={24} />
            ) : (
              <MdDarkMode size={24} />
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-6 space-y-6"
        >
          <nav className="flex flex-col space-y-4 text-xl">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/rooms"
              onClick={closeMobileMenu}
              className="font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Rooms
            </Link>
            <Link
              href="/gallery"
              onClick={closeMobileMenu}
              className="font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="font-medium hover:text-green-400 transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            {renderUserSection()}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
