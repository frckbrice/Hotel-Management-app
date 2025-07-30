'use client';

import Link from 'next/link';
import React, { useState } from 'react';
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Rooms' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className='sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-20'>
          {/* Logo Section - Left */}
          <div className='flex items-center'>
            <Link href='/' className='group relative'>
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
          <nav className='hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2'>
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className='relative group px-3 py-2 text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 hover:text-green-600 dark:hover:text-green-400'
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
                  className='flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300'
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
                        alt={session.user.name!}
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
                    >
                      <FaUserCircle className='text-white' size={24} />
                    </div>
                  )}
                </Link>
              ) : (
                <Link
                  href='/auth'
                  className='group flex items-center space-x-2 px-4 py-2 text-white rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
                  style={{
                    background:
                      'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))',
                  }}
                >
                  <FaUserCircle size={20} />
                  <span className='hidden sm:inline font-medium'>Sign In</span>
                </Link>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                setDarkTheme(!darkTheme);
                if (darkTheme) {
                  localStorage.removeItem('hotel-theme');
                } else {
                  localStorage.setItem('hotel-theme', 'true');
                }
              }}
              className='relative p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group overflow-hidden'
            >
              <div className='relative z-10'>
                {darkTheme ? (
                  <MdOutlineLightMode
                    className='text-yellow-500 group-hover:rotate-12 transition-transform duration-300'
                    size={24}
                  />
                ) : (
                  <MdDarkMode
                    className='text-gray-700 group-hover:-rotate-12 transition-transform duration-300'
                    size={24}
                  />
                )}
              </div>
              <div className='absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300'></div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className='lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300'
            >
              {isMobileMenuOpen ? (
                <FaTimes
                  className='text-gray-700 dark:text-gray-300'
                  size={24}
                />
              ) : (
                <FaBars
                  className='text-gray-700 dark:text-gray-300'
                  size={24}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-64 opacity-100 pb-6'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <nav className='flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700'>
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className='group flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300'
                style={{ animationDelay: `${index * 50}ms` }}
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
