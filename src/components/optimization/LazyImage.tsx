"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ImageIcon, Hotel, Loader2, AlertTriangle } from "lucide-react";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholderText?: string;
  showPlaceholderText?: boolean;
  aspectRatio?: "square" | "landscape" | "portrait" | "wide" | "custom";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  overlay?: boolean;
  loading?: "lazy" | "eager";
  fallbackSrc?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 90,
  sizes = "(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw",
  placeholder = "blur",
  blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
  onLoad,
  onError,
  placeholderText = "Loading...",
  showPlaceholderText = true,
  aspectRatio = "landscape",
  objectFit = "cover",
  rounded = "lg",
  shadow = "md",
  hover = true,
  overlay = false,
  loading = "lazy",
  fallbackSrc,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(priority || false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsVisible(true);
      return;
    }

    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50px" },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Handle image error with fallback
  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
    }
    onError?.();
  };

  // Handle successful load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Aspect ratio classes
  const aspectRatioClasses = {
    square: "aspect-square",
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
    wide: "aspect-[16/9]",
    custom: "",
  };

  // Rounded classes
  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  // Shadow classes
  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  const containerClasses = `
        relative overflow-hidden bg-gray-100 dark:bg-gray-800
        ${aspectRatioClasses[aspectRatio]}
        ${roundedClasses[rounded]}
        ${shadowClasses[shadow]}
        ${hover ? "transition-all duration-300 hover:shadow-lg hover:scale-[1.02]" : ""}
        ${className}
    `.trim();

  const imageId = `lazy-image-${src}`;

  return (
    <div
      ref={containerRef}
      id={imageId}
      className={containerClasses}
      style={{ width: width || "100%", height: height || "auto" }}
    >
      {/* Loading Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <Hotel className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin absolute -top-1 -right-1" />
            </div>
            {showPlaceholderText && (
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {placeholderText}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
          <div className="flex flex-col items-center space-y-3 text-center px-4">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-700 dark:text-red-400">
                Image unavailable
              </p>
              <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                {alt || "Hotel image"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {isVisible && !hasError && (
        <>
          {width && height ? (
            <Image
              src={currentSrc}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
              quality={quality}
              sizes={sizes}
              placeholder={placeholder}
              blurDataURL={blurDataURL}
              loading={priority ? undefined : loading}
              onLoad={handleLoad}
              onError={handleError}
              className={`
                transition-all duration-500 ease-out w-full h-full
                ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
                ${objectFit === "cover" ? "object-cover" : ""}
                ${objectFit === "contain" ? "object-contain" : ""}
                ${objectFit === "fill" ? "object-fill" : ""}
                ${objectFit === "none" ? "object-none" : ""}
                ${objectFit === "scale-down" ? "object-scale-down" : ""}
              `}
              style={{
                objectPosition: "center",
              }}
            />
          ) : (
            <Image
              src={currentSrc}
              alt={alt}
              fill
              priority={priority}
              quality={quality}
              sizes={sizes}
              placeholder={placeholder}
              blurDataURL={blurDataURL}
              loading={priority ? undefined : loading}
              onLoad={handleLoad}
              onError={handleError}
              className={`
                transition-all duration-500 ease-out
                ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
                ${objectFit === "cover" ? "object-cover" : ""}
                ${objectFit === "contain" ? "object-contain" : ""}
                ${objectFit === "fill" ? "object-fill" : ""}
                ${objectFit === "none" ? "object-none" : ""}
                ${objectFit === "scale-down" ? "object-scale-down" : ""}
              `}
              style={{
                objectPosition: "center",
              }}
            />
          )}

          {/* Overlay Effect */}
          {overlay && isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          )}
        </>
      )}

      {/* Hotel-specific enhancement: Image type indicator */}
      {isLoaded && !hasError && (
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white opacity-0 hover:opacity-100 transition-opacity duration-200">
          <ImageIcon className="w-3 h-3 inline mr-1" />
          Hotel Image
        </div>
      )}

      {/* Zoom indicator for hotel images */}
      {hover && isLoaded && !hasError && (
        <div className="absolute bottom-2 right-2 p-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full opacity-0 hover:opacity-100 transition-all duration-200 shadow-lg">
          <svg
            className="w-4 h-4 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
