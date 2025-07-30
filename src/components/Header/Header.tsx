'use client';

import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { useThemeContext } from '@/app/(web)/themeProvider/ThemeProvider';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

type Props = {};

const Header = (props: Props) => {
  const { darkTheme, setDarkTheme } = useThemeContext();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    if (darkTheme) {
      localStorage.removeItem('hotel-theme');
    } else {
      localStorage.setItem('hotel-theme', 'true');
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      mobileMenuButtonRef.current?.focus();
    }
  };

  // Handle click outside mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Focus management for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      const firstLink = mobileMenuRef.current?.querySelector('a');
      firstLink?.focus();
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: '/', label: 'Home', description: 'Navigate to the home page' },
    {
      href: '/rooms',
      label: 'Rooms',
      description: 'Browse available hotel rooms',
    },
    {
      href: '/gallery',
      label: 'Gallery',
      description: 'View hotel photos and amenities',
    },
    { href: '/contact', label: 'Contact', description: 'Get in touch with us' },
  ];

  return (
    <header
      className='sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20'
      role='banner'
      aria-label='Main navigation'
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo Section - Left */}
          <div className='flex items-center'>
            <Link
              href='/'
              className='group relative focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg p-1'
              aria-label='HotelMT - Go to homepage'
            >
              <span className='font-black bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-transparent bg-clip-text text-4xl'>
                HotelMT
              </span>
              <div
                className='absolute -bottom-1 left-0 w-0 h-0.5'
                style={{
                  background:
                    'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))',
                }}
              ></div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav
            className='hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2'
            role='navigation'
            aria-label='Main navigation'
          >
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className='relative group px-3 py-2 text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 hover:text-green-600 dark:hover:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg'
                aria-label={item.description}
              >
                {item.label}
                <div
                  className='absolute -bottom-2 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300'
                  style={{
                    background:
                      'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))',
                  }}
                ></div>
              </Link>
            ))}
          </nav>

          {/* Right Section - User & Theme Controls */}
          <div className='flex items-center space-x-4'>
            {/* User Profile */}
            <div className='relative group'>
              {session?.user ? (
                <Link
                  href={`/users/${session.user.id}`}
                  className='flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                  aria-label={`View profile for ${session.user.name || 'user'}`}
                >
                  {session.user.image ? (
                    <div
                      className='relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-transparent transition-all duration-300'
                      style={
                        { '--tw-ring-color': 'hsl(var(--primary))' } as any
                      }
                    >
                      <Image
                        src={session.user.image}
                        alt={`Profile picture of ${session.user.name || 'user'}`}
                        width={40}
                        height={40}
                        className='object-cover transition-transform duration-300 group-hover:scale-110'
                        sizes='40px'
                      />
                    </div>
                  ) : (
                    <div
                      className='w-10 h-10 rounded-full flex items-center justify-center'
                      style={{
                        background:
                          'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))',
                      }}
                      aria-hidden='true'
                    >
                      <FaUserCircle className='text-white' size={24} />
                    </div>
                  )}
                </Link>
              ) : (
                <Link
                  href='/auth'
                  className='group flex items-center space-x-2 px-4 py-2 text-white rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                  style={{
                    background:
                      'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))',
                  }}
                  aria-label='Sign in to your account'
                >
                  <FaUserCircle size={20} aria-hidden='true' />
                  <span className='hidden sm:inline font-medium'>Sign In</span>
                </Link>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              ref={themeButtonRef}
              onClick={toggleTheme}
              className='relative p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
              aria-label={`Switch to ${darkTheme ? 'light' : 'dark'} mode`}
              aria-pressed={darkTheme}
            >
              <div className='relative z-10'>
                {darkTheme ? (
                  <MdOutlineLightMode
                    className='text-yellow-500 group-hover:rotate-12 transition-transform duration-300'
                    size={24}
                    aria-hidden='true'
                  />
                ) : (
                  <MdDarkMode
                    className='text-gray-700 group-hover:-rotate-12 transition-transform duration-300'
                    size={24}
                    aria-hidden='true'
                  />
                )}
              </div>
              <div className='absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              ref={mobileMenuButtonRef}
              onClick={toggleMobileMenu}
              className='lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
              aria-label={`${isMobileMenuOpen ? 'Close' : 'Open'} mobile navigation menu`}
              aria-expanded={isMobileMenuOpen}
              aria-controls='mobile-menu'
            >
              {isMobileMenuOpen ? (
                <FaTimes
                  className='text-gray-700 dark:text-gray-300'
                  size={24}
                  aria-hidden='true'
                />
              ) : (
                <FaBars
                  className='text-gray-700 dark:text-gray-300'
                  size={24}
                  aria-hidden='true'
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          ref={mobileMenuRef}
          id='mobile-menu'
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-64 opacity-100 pb-6'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
          role='navigation'
          aria-label='Mobile navigation'
          onKeyDown={handleKeyDown}
        >
          <nav className='flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700'>
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className='group flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                style={{ animationDelay: `${index * 50}ms` }}
                aria-label={item.description}
              >
                <span className='group-hover:translate-x-2 transition-transform duration-300'>
                  {item.label}
                </span>
                <div
                  className='ml-auto w-0 h-0.5 group-hover:w-6 transition-all duration-300'
                  style={{
                    background:
                      'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))',
                  }}
                ></div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
