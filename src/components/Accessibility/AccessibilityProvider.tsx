'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';

interface AccessibilityContextType {
  announceToScreenReader: (message: string) => void;
  setFocus: (element: HTMLElement | null) => void;
  skipToMainContent: () => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      'useAccessibility must be used within an AccessibilityProvider'
    );
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({
  children,
}) => {
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLElement>(null);

  const announceToScreenReader = (message: string) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = message;
      // Clear the message after a short delay
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = '';
        }
      }, 1000);
    }
  };

  const setFocus = (element: HTMLElement | null) => {
    if (element) {
      element.focus();
    }
  };

  const skipToMainContent = () => {
    if (mainContentRef.current) {
      mainContentRef.current.focus();
      announceToScreenReader('Skipped to main content');
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip to main content with 'S' key
      if (event.key === 'S' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        skipToMainContent();
      }

      // Escape key to close modals or menus
      if (event.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.getAttribute('data-modal')) {
          activeElement.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Set up focus management
  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;

      // Add focus indicator for keyboard navigation
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT'
      ) {
        target.classList.add('focus-visible');
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      target.classList.remove('focus-visible');
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const contextValue: AccessibilityContextType = {
    announceToScreenReader,
    setFocus,
    skipToMainContent,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {/* Skip to main content link */}
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50'
        onClick={skipToMainContent}
      >
        Skip to main content
      </a>

      {/* Live region for screen reader announcements */}
      <div
        ref={liveRegionRef}
        aria-live='polite'
        aria-atomic='true'
        className='sr-only'
      />

      {/* Main content reference */}
      <main ref={mainContentRef} id='main-content' tabIndex={-1}>
        {children}
      </main>
    </AccessibilityContext.Provider>
  );
};
