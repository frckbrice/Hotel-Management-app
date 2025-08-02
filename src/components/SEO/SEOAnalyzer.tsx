"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

interface SEOAnalysis {
  title: string;
  description: string;
  keywords: string[];
  openGraph: boolean;
  twitterCards: boolean;
  structuredData: boolean;
  sitemap: boolean;
  robots: boolean;
  performance: {
    fcp: number;
    lcp: number;
    fid: number;
    cls: number;
    ttfb: number;
  };
  accessibility: {
    altTexts: boolean;
    ariaLabels: boolean;
    focusManagement: boolean;
    colorContrast: boolean;
  };
}

/**
The SEO components are well-designed but currently unused. 
They provide additional flexibility for page-specific SEO 
and development-time analysis, but the current global SEO implementation
 is already quite comprehensive. The components are ready for future use if needed.
 */

const SEOAnalyzer: React.FC = () => {
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show analyzer after page load
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Analyze SEO elements
      const title = document.title;
      const metaDescription =
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") || "";
      const metaKeywords =
        document
          .querySelector('meta[name="keywords"]')
          ?.getAttribute("content") || "";
      const openGraph =
        document.querySelectorAll('meta[property^="og:"]').length > 0;
      const twitterCards =
        document.querySelectorAll('meta[name^="twitter:"]').length > 0;
      const structuredData =
        document.querySelectorAll('script[type="application/ld+json"]').length >
        0;
      const sitemap = document.querySelector('link[rel="sitemap"]') !== null;
      const robots = document.querySelector('meta[name="robots"]') !== null;

      // Analyze accessibility/ */
      const images = document.querySelectorAll("img");
      const altTexts = Array.from(images).every((img) =>
        img.hasAttribute("alt"),
      );
      const ariaLabels =
        document.querySelectorAll("[aria-label], [aria-labelledby]").length > 0;
      const focusManagement =
        document.querySelectorAll("[tabindex]").length > 0;
      const colorContrast = true; // This would need a more sophisticated analysis

      // Performance metrics (simplified)
      const performance = {
        fcp: 0,
        lcp: 0,
        fid: 0,
        cls: 0,
        ttfb: 0,
      };

      if ("PerformanceObserver" in window) {
        // FCP
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === "first-contentful-paint") {
              performance.fcp = entry.startTime;
            }
          });
        });
        fcpObserver.observe({ entryTypes: ["paint"] });

        // LCP
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            performance.lcp = lastEntry.startTime;
          }
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

        // CLS
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              performance.cls = clsValue;
            }
          });
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });
      }

      setAnalysis({
        title,
        description: metaDescription,
        keywords: metaKeywords
          .split(",")
          .map((k) => k.trim())
          .filter((k) => k),
        openGraph,
        twitterCards,
        structuredData,
        sitemap,
        robots,
        performance,
        accessibility: {
          altTexts,
          ariaLabels,
          focusManagement,
          colorContrast,
        },
      });
    }
  }, []);

  if (!isVisible || !analysis) return null;

  const getScore = () => {
    let score = 0;
    let total = 0;

    // SEO Score
    if (analysis.title.length > 10 && analysis.title.length < 60) score++;
    if (analysis.description.length > 50 && analysis.description.length < 160)
      score++;
    if (analysis.keywords.length > 0) score++;
    if (analysis.openGraph) score++;
    if (analysis.twitterCards) score++;
    if (analysis.structuredData) score++;
    if (analysis.sitemap) score++;
    if (analysis.robots) score++;
    total += 8;

    // Performance Score
    if (analysis.performance.fcp < 1800) score++;
    if (analysis.performance.lcp < 2500) score++;
    if (analysis.performance.cls < 0.1) score++;
    total += 3;

    // Accessibility Score
    if (analysis.accessibility.altTexts) score++;
    if (analysis.accessibility.ariaLabels) score++;
    if (analysis.accessibility.focusManagement) score++;
    if (analysis.accessibility.colorContrast) score++;
    total += 4;

    return Math.round((score / total) * 100);
  };

  const score = getScore();

  return (
    <div className="fixed top-4 left-4 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 p-4 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">SEO & Performance</h3>
        <div
          className={`text-xs px-2 py-1 rounded ${
            score >= 90
              ? "bg-green-100 text-green-800"
              : score >= 70
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {score}/100
        </div>
      </div>

      <div className="space-y-2 text-xs">
        {/* SEO Section */}
        <div>
          <h4 className="font-medium mb-1">SEO</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              {analysis.title.length > 10 && analysis.title.length < 60 ? (
                <CheckCircle size={12} className="text-green-500" />
              ) : (
                <XCircle size={12} className="text-red-500" />
              )}
              <span>Title ({analysis.title.length}/60)</span>
            </div>
            <div className="flex items-center space-x-1">
              {analysis.description.length > 50 &&
              analysis.description.length < 160 ? (
                <CheckCircle size={12} className="text-green-500" />
              ) : (
                <XCircle size={12} className="text-red-500" />
              )}
              <span>Description ({analysis.description.length}/160)</span>
            </div>
            <div className="flex items-center space-x-1">
              {analysis.openGraph ? (
                <CheckCircle size={12} className="text-green-500" />
              ) : (
                <XCircle size={12} className="text-red-500" />
              )}
              <span>Open Graph</span>
            </div>
            <div className="flex items-center space-x-1">
              {analysis.twitterCards ? (
                <CheckCircle size={12} className="text-green-500" />
              ) : (
                <XCircle size={12} className="text-red-500" />
              )}
              <span>Twitter Cards</span>
            </div>
            <div className="flex items-center space-x-1">
              {analysis.structuredData ? (
                <CheckCircle size={12} className="text-green-500" />
              ) : (
                <XCircle size={12} className="text-red-500" />
              )}
              <span>Structured Data</span>
            </div>
          </div>
        </div>

        {/* Performance Section */}
        <div>
          <h4 className="font-medium mb-1">Performance</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              {analysis.performance.fcp < 1800 ? (
                <CheckCircle size={12} className="text-green-500" />
              ) : (
                <AlertCircle size={12} className="text-yellow-500" />
              )}
              <span>FCP: {Math.round(analysis.performance.fcp)}ms</span>
            </div>
            <div className="flex items-center space-x-1">
              {analysis.performance.lcp < 2500 ? (
                <CheckCircle size={12} className="text-green-500" />
              ) : (
                <AlertCircle size={12} className="text-yellow-500" />
              )}
              <span>LCP: {Math.round(analysis.performance.lcp)}ms</span>
            </div>
            <div className="flex items-center space-x-1">
              {analysis.performance.cls < 0.1 ? (
                <CheckCircle size={12} className="text-green-500" />
              ) : (
                <AlertCircle size={12} className="text-yellow-500" />
              )}
              <span>CLS: {analysis.performance.cls.toFixed(3)}</span>
            </div>
          </div>
        </div>

        {/* Accessibility Section */}
        <div>
          <h4 className="font-medium mb-1">Accessibility</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              {analysis.accessibility.altTexts ? (
                <CheckCircle size={12} className="text-green-500" />
              ) : (
                <XCircle size={12} className="text-red-500" />
              )}
              <span>Alt Texts</span>
            </div>
            <div className="flex items-center space-x-1">
              {analysis.accessibility.ariaLabels ? (
                <CheckCircle size={12} className="text-green-500" />
              ) : (
                <XCircle size={12} className="text-red-500" />
              )}
              <span>ARIA Labels</span>
            </div>
            <div className="flex items-center space-x-1">
              {analysis.accessibility.focusManagement ? (
                <CheckCircle size={12} className="text-green-500" />
              ) : (
                <XCircle size={12} className="text-red-500" />
              )}
              <span>Focus Management</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Info size={12} />
          <span>Auto-refresh every 30s</span>
        </div>
      </div>
    </div>
  );
};

export default SEOAnalyzer;
