// Performance optimization utilities

/**
 * Debounce function to limit the rate of function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function to limit function execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string = "fetch") {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Preload critical images
 */
export function preloadImage(src: string) {
  const img = new Image();
  img.src = src;
}

/**
 * Intersection Observer for lazy loading
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {},
) {
  return new IntersectionObserver(callback, {
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  });
}

/**
 * Performance monitoring
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMeasure(name: string): void {
    performance.mark(`${name}-start`);
  }

  endMeasure(name: string): number {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);

    const measure = performance.getEntriesByName(name)[0];
    const duration = measure.duration;

    this.metrics.set(name, duration);
    return duration;
  }

  getMetrics(): Map<string, number> {
    return new Map(this.metrics);
  }

  clearMetrics(): void {
    this.metrics.clear();
  }
}

/**
 * Resource hints for better performance
 */
export function addResourceHints() {
  // Preconnect to external domains
  const preconnectDomains = [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://api.sanity.io",
    "https://api.stripe.com",
  ];

  preconnectDomains.forEach((domain) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = domain;
    document.head.appendChild(link);
  });
}

/**
 * Optimize images for better performance
 */
export function optimizeImageUrl(
  url: string,
  width: number,
  quality: number = 75,
): string {
  // Add image optimization parameters
  const params = new URLSearchParams();
  params.set("w", width.toString());
  params.set("q", quality.toString());
  params.set("fm", "webp"); // Use WebP format

  return `${url}?${params.toString()}`;
}

/**
 * Cache management utilities
 */
export class CacheManager {
  private static cache = new Map<string, any>();

  static set(key: string, value: any, ttl: number = 300000): void {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl,
    });
  }

  static get(key: string): any {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  static clear(): void {
    this.cache.clear();
  }

  static size(): number {
    return this.cache.size;
  }
}

/**
 * Bundle size optimization
 */
export function createDynamicImport<T>(
  importFn: () => Promise<T>,
): () => Promise<T> {
  let dynamicModule: T | null = null;

  return async () => {
    if (!dynamicModule) {
      dynamicModule = await importFn();
    }
    return dynamicModule;
  };
}

/**
 * Memory management
 */
export function cleanupMemory() {
  if ("memory" in performance) {
    const memory = (performance as any).memory;
    console.log("Memory usage:", {
      used: Math.round(memory.usedJSHeapSize / 1048576) + " MB",
      total: Math.round(memory.totalJSHeapSize / 1048576) + " MB",
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) + " MB",
    });
  }
}

/**
 * Network performance monitoring
 */
export function monitorNetworkPerformance() {
  if ("connection" in navigator) {
    const connection = (navigator as any).connection;
    console.log("Network info:", {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink + " Mbps",
      rtt: connection.rtt + " ms",
    });
  }
}
