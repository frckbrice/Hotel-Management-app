"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

interface AccessibilityContextType {
  announceToScreenReader: (message: string) => void;
  setFocus: (element: HTMLElement | null) => void;
  skipToMainContent: () => void;
}

const initialAccessibilityContext: AccessibilityContextType = {
  announceToScreenReader: () => {},
  setFocus: () => {},
  skipToMainContent: () => {},
};

const AccessibilityContext = createContext<AccessibilityContextType>(
  initialAccessibilityContext,
);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider",
    );
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const announceToScreenReader = (message: string) => {
    if (typeof window !== "undefined" && liveRegionRef.current) {
      liveRegionRef.current.textContent = message;
      // Clear the message after a short delay
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = "";
        }
      }, 1000);
    }
  };

  const setFocus = (element: HTMLElement | null) => {
    if (typeof window !== "undefined" && element) {
      element.focus();
    }
  };

  const skipToMainContent = useCallback(() => {
    if (typeof window !== "undefined" && mainContentRef.current) {
      mainContentRef.current.focus();
      announceToScreenReader("Skipped to main content");
    }
  }, []);

  // Handle keyboard navigation only on client side
  useEffect(() => {
    if (typeof window === "undefined" || !isMounted) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip to main content with 'S' key
      if (event.key === "S" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        skipToMainContent();
      }

      // Escape key to close modals or menus
      if (event.key === "Escape") {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.getAttribute("data-modal")) {
          activeElement.click();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMounted, skipToMainContent]);

  // Set up focus management
  useEffect(() => {
    if (typeof window === "undefined" || !isMounted) return;

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;

      // Add focus indicator for keyboard navigation
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT"
      ) {
        target.classList.add("focus-visible");
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      target.classList.remove("focus-visible");
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [isMounted]);

  const contextValue: AccessibilityContextType = {
    announceToScreenReader,
    setFocus,
    skipToMainContent,
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <AccessibilityContext.Provider value={contextValue}>
        <div>{children}</div>
      </AccessibilityContext.Provider>
    );
  }

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50"
        onClick={skipToMainContent}
      >
        Skip to main content
      </a>

      {/* Live region for screen reader announcements */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Main content reference */}
      <div ref={mainContentRef} id="main-content" tabIndex={-1}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export default AccessibilityProvider;
