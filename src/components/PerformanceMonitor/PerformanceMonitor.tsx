'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
}

const PerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            const fcp = entry.startTime;
            console.log('FCP:', fcp);

            // Send to analytics
            if (fcp < 1800) {
              console.log('✅ FCP is good');
            } else if (fcp < 3000) {
              console.log('⚠️ FCP needs improvement');
            } else {
              console.log('❌ FCP is poor');
            }
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const lcp = lastEntry.startTime;
          console.log('LCP:', lcp);

          if (lcp < 2500) {
            console.log('✅ LCP is good');
          } else if (lcp < 4000) {
            console.log('⚠️ LCP needs improvement');
          } else {
            console.log('❌ LCP is poor');
          }
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const fid = (entry as any).processingStart - entry.startTime;
          console.log('FID:', fid);

          if (fid < 100) {
            console.log('✅ FID is good');
          } else if (fid < 300) {
            console.log('⚠️ FID needs improvement');
          } else {
            console.log('❌ FID is poor');
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log('CLS:', clsValue);

            if (clsValue < 0.1) {
              console.log('✅ CLS is good');
            } else if (clsValue < 0.25) {
              console.log('⚠️ CLS needs improvement');
            } else {
              console.log('❌ CLS is poor');
            }
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Time to First Byte (TTFB)
      const navigationObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.entryType === 'navigation') {
            const ttfb = entry.responseStart - entry.requestStart;
            console.log('TTFB:', ttfb);

            if (ttfb < 800) {
              console.log('✅ TTFB is good');
            } else if (ttfb < 1800) {
              console.log('⚠️ TTFB needs improvement');
            } else {
              console.log('❌ TTFB is poor');
            }
          }
        });
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });

      // Memory usage monitoring
      if ('memory' in performance) {
        const memoryInfo = (performance as any).memory;
        console.log('Memory Usage:', {
          usedJSHeapSize: memoryInfo.usedJSHeapSize,
          totalJSHeapSize: memoryInfo.totalJSHeapSize,
          jsHeapSizeLimit: memoryInfo.jsHeapSizeLimit,
        });
      }

      // Network information
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        console.log('Network Info:', {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
        });
      }

      // Cleanup
      return () => {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        navigationObserver.disconnect();
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
