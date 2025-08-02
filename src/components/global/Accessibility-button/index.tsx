"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Accessibility,
  ZoomIn,
  ZoomOut,
  Contrast,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  X,
  Settings,
} from "lucide-react";
import { useThemeContext } from "@/context/theme/ThemeProvider";
import { useAccessibility } from "@/context/accessibility-provider";

interface AccessibilitySettings {
  fontSize: number;
  contrast: "normal" | "high";
  sound: boolean;
  reducedMotion: boolean;
}

export default function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100, // percentage
    contrast: "normal",
    sound: true,
    reducedMotion: false,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Always call hooks, but handle undefined context
  const themeContext = useThemeContext();
  const { darkTheme = false, setDarkTheme = () => {} } = themeContext || {};

  const accessibilityContext = useAccessibility();
  const { announceToScreenReader = () => {} } = accessibilityContext || {};

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show button after page load
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Apply accessibility settings
  useEffect(() => {
    if (!isMounted) return;

    const root = document.documentElement;

    // Font size
    root.style.fontSize = `${settings.fontSize}%`;

    // Contrast
    if (settings.contrast === "high") {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add("reduced-motion");
    } else {
      root.classList.remove("reduced-motion");
    }
  }, [settings, isMounted]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        announceToScreenReader("Accessibility menu closed");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, announceToScreenReader]);

  if (!isMounted || !isVisible) {
    return null;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    announceToScreenReader(
      isOpen ? "Accessibility menu closed" : "Accessibility menu opened",
    );
  };

  const increaseFontSize = () => {
    setSettings((prev) => ({
      ...prev,
      fontSize: Math.min(prev.fontSize + 10, 200),
    }));
    announceToScreenReader("Font size increased");
  };

  const decreaseFontSize = () => {
    setSettings((prev) => ({
      ...prev,
      fontSize: Math.max(prev.fontSize - 10, 80),
    }));
    announceToScreenReader("Font size decreased");
  };

  const toggleContrast = () => {
    setSettings((prev) => ({
      ...prev,
      contrast: prev.contrast === "normal" ? "high" : "normal",
    }));
    announceToScreenReader(
      `High contrast ${settings.contrast === "normal" ? "enabled" : "disabled"}`,
    );
  };

  const toggleSound = () => {
    setSettings((prev) => ({
      ...prev,
      sound: !prev.sound,
    }));
    announceToScreenReader(`Sound ${settings.sound ? "disabled" : "enabled"}`);
  };

  const toggleReducedMotion = () => {
    setSettings((prev) => ({
      ...prev,
      reducedMotion: !prev.reducedMotion,
    }));
    announceToScreenReader(
      `Reduced motion ${settings.reducedMotion ? "disabled" : "enabled"}`,
    );
  };

  const toggleTheme = () => {
    if (isMounted && setDarkTheme) {
      setDarkTheme(!darkTheme);
      announceToScreenReader(`${darkTheme ? "Light" : "Dark"} theme enabled`);
    }
  };

  const resetSettings = () => {
    setSettings({
      fontSize: 100,
      contrast: "normal",
      sound: true,
      reducedMotion: false,
    });
    announceToScreenReader("Accessibility settings reset to default");
  };

  if (!isVisible) return null;

  return (
    <div
      ref={buttonRef}
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? "w-80 h-auto" : "w-14 h-14"
      }`}
    >
      {/* Main Accessibility Button */}
      <button
        onClick={toggleMenu}
        className={`
                    w-14 h-14 rounded-full shadow-lg transition-all duration-300 ease-in-out
                    flex items-center justify-center
                    ${
                      darkTheme
                        ? "bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
                        : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200"
                    }
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                    ${isOpen ? "scale-110" : "scale-100"}
                `}
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
        aria-controls="accessibility-menu"
      >
        {isOpen ? <X size={24} /> : <Accessibility size={24} />}
      </button>

      {/* Accessibility Menu */}
      {isOpen && (
        <div
          id="accessibility-menu"
          className={`
                        absolute bottom-16 right-0 w-80 p-4 rounded-lg shadow-xl
                        transition-all duration-300 ease-in-out
                        ${
                          darkTheme
                            ? "bg-gray-800 text-white border border-gray-600"
                            : "bg-white text-gray-800 border border-gray-200"
                        }
                    `}
          role="dialog"
          aria-label="Accessibility settings menu"
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Accessibility</h3>
              <button
                onClick={resetSettings}
                className="text-sm text-green-500 hover:text-green-400 transition-colors"
                aria-label="Reset to default settings"
              >
                Reset
              </button>
            </div>

            {/* Font Size Controls */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Font Size</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={decreaseFontSize}
                  className={`
                                        p-2 rounded-lg transition-colors
                                        ${
                                          darkTheme
                                            ? "bg-gray-700 hover:bg-gray-600"
                                            : "bg-gray-100 hover:bg-gray-200"
                                        }
                                    `}
                  aria-label="Decrease font size"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="flex-1 text-center text-sm">
                  {settings.fontSize}%
                </span>
                <button
                  onClick={increaseFontSize}
                  className={`
                                        p-2 rounded-lg transition-colors
                                        ${
                                          darkTheme
                                            ? "bg-gray-700 hover:bg-gray-600"
                                            : "bg-gray-100 hover:bg-gray-200"
                                        }
                                    `}
                  aria-label="Increase font size"
                >
                  <ZoomIn size={16} />
                </button>
              </div>
            </div>

            {/* Toggle Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={toggleContrast}
                className={`
                                    p-3 rounded-lg transition-colors flex items-center space-x-2
                                    ${
                                      settings.contrast === "high"
                                        ? "bg-green-600 text-white"
                                        : darkTheme
                                          ? "bg-gray-400 hover:bg-gray-300"
                                          : "bg-gray-600 hover:bg-gray-500"
                                    }
                                `}
                aria-label={`${
                  settings.contrast === "normal" ? "Enable" : "Disable"
                } high contrast`}
              >
                <Contrast size={16} />
                <span className="text-sm">High Contrast</span>
              </button>

              <button
                onClick={toggleSound}
                className={`
                                    p-3 rounded-lg transition-colors flex items-center space-x-2
                                    ${
                                      !settings.sound
                                        ? "bg-green-600 text-white"
                                        : darkTheme
                                          ? "bg-gray-700 hover:bg-gray-600"
                                          : "bg-gray-100 hover:bg-gray-200"
                                    }
                                `}
                aria-label={`${settings.sound ? "Disable" : "Enable"} sound`}
              >
                {settings.sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
                <span className="text-sm">Sound</span>
              </button>

              <button
                onClick={toggleReducedMotion}
                className={`
                                    p-3 rounded-lg transition-colors flex items-center space-x-2
                                    ${
                                      settings.reducedMotion
                                        ? "bg-green-600 text-white"
                                        : darkTheme
                                          ? "bg-gray-700 hover:bg-gray-600"
                                          : "bg-gray-100 hover:bg-gray-200"
                                    }
                                `}
                aria-label={`${
                  settings.reducedMotion ? "Disable" : "Enable"
                } reduced motion`}
              >
                <Settings size={16} />
                <span className="text-sm">Reduced Motion</span>
              </button>

              <button
                onClick={toggleTheme}
                className={`
                                    p-3 rounded-lg transition-colors flex items-center space-x-2
                                    ${
                                      darkTheme
                                        ? "bg-gray-700 hover:bg-gray-600"
                                        : "bg-gray-100 hover:bg-gray-200"
                                    }
                                `}
                aria-label={`Switch to ${darkTheme ? "light" : "dark"} theme`}
              >
                {darkTheme ? <Sun size={16} /> : <Moon size={16} />}
                <span className="text-sm">Theme</span>
              </button>
            </div>

            {/* Status Indicators */}
            <div className="text-xs text-gray-500 space-y-1">
              <div>Font: {settings.fontSize}%</div>
              <div>Contrast: {settings.contrast}</div>
              <div>Sound: {settings.sound ? "On" : "Off"}</div>
              <div>Motion: {settings.reducedMotion ? "Reduced" : "Normal"}</div>
              <div>Theme: {darkTheme ? "Dark" : "Light"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
