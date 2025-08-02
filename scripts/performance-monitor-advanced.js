#!/usr/bin/env node

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fcp: null, // First Contentful Paint
      lcp: null, // Largest Contentful Paint
      cls: null, // Cumulative Layout Shift
      tbt: null, // Total Blocking Time
      si: null, // Speed Index
      tti: null, // Time to Interactive
      fmp: null, // First Meaningful Paint
      ttf: null, // Time to First Byte
    };
  }

  async runLighthouse(url = "http://localhost:3000") {
    return new Promise((resolve, reject) => {
      const outputPath =
        "./project-improvements/performance/lighthouse-advanced-report.json";
      const command = `npx lighthouse ${url} --output=json --output-path=${outputPath} --chrome-flags='--headless' --only-categories=performance`;

      console.log("🔍 Running Lighthouse performance audit...");

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("❌ Lighthouse error:", error);
          reject(error);
          return;
        }

        try {
          if (fs.existsSync(outputPath)) {
            const report = JSON.parse(fs.readFileSync(outputPath, "utf8"));
            this.parseMetrics(report);
            resolve(this.metrics);
          } else {
            reject(new Error("Lighthouse report not found"));
          }
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  }

  parseMetrics(report) {
    const audits = report.audits;

    // Core Web Vitals
    this.metrics.fcp = audits["first-contentful-paint"]?.numericValue;
    this.metrics.lcp = audits["largest-contentful-paint"]?.numericValue;
    this.metrics.cls = audits["cumulative-layout-shift"]?.numericValue;
    this.metrics.tbt = audits["total-blocking-time"]?.numericValue;

    // Additional metrics
    this.metrics.si = audits["speed-index"]?.numericValue;
    this.metrics.tti = audits["interactive"]?.numericValue;
    this.metrics.fmp = audits["first-meaningful-paint"]?.numericValue;
    this.metrics.ttf = audits["server-response-time"]?.numericValue;

    // Performance score
    this.metrics.score = report.categories.performance.score * 100;
  }

  displayResults() {
    console.log("\n📊 Performance Metrics Report");
    console.log("=".repeat(50));

    // Performance Score
    console.log(`🎯 Performance Score: ${this.metrics.score?.toFixed(1)}%`);

    // Core Web Vitals
    console.log("\n🚀 Core Web Vitals:");
    console.log(
      `   FCP (First Contentful Paint): ${this.formatTime(this.metrics.fcp)}`,
    );
    console.log(
      `   LCP (Largest Contentful Paint): ${this.formatTime(this.metrics.lcp)}`,
    );
    console.log(
      `   CLS (Cumulative Layout Shift): ${this.formatCLS(this.metrics.cls)}`,
    );
    console.log(
      `   TBT (Total Blocking Time): ${this.formatTime(this.metrics.tbt)}`,
    );

    // Additional Metrics
    console.log("\n⚡ Additional Metrics:");
    console.log(`   Speed Index: ${this.formatTime(this.metrics.si)}`);
    console.log(`   Time to Interactive: ${this.formatTime(this.metrics.tti)}`);
    console.log(
      `   First Meaningful Paint: ${this.formatTime(this.metrics.fmp)}`,
    );
    console.log(`   Time to First Byte: ${this.formatTime(this.metrics.ttf)}`);

    // Performance Assessment
    this.assessPerformance();
  }

  formatTime(ms) {
    if (!ms) return "N/A";
    return `${ms.toFixed(0)}ms`;
  }

  formatCLS(value) {
    if (!value) return "N/A";
    return value.toFixed(3);
  }

  assessPerformance() {
    console.log("\n📈 Performance Assessment:");

    const assessments = [];

    // FCP assessment
    if (this.metrics.fcp <= 1800) {
      assessments.push("✅ FCP: Excellent (< 1.8s)");
    } else if (this.metrics.fcp <= 3000) {
      assessments.push("⚠️  FCP: Needs improvement (1.8s - 3s)");
    } else {
      assessments.push("❌ FCP: Poor (> 3s)");
    }

    // LCP assessment
    if (this.metrics.lcp <= 2500) {
      assessments.push("✅ LCP: Excellent (< 2.5s)");
    } else if (this.metrics.lcp <= 4000) {
      assessments.push("⚠️  LCP: Needs improvement (2.5s - 4s)");
    } else {
      assessments.push("❌ LCP: Poor (> 4s)");
    }

    // CLS assessment
    if (this.metrics.cls <= 0.1) {
      assessments.push("✅ CLS: Excellent (< 0.1)");
    } else if (this.metrics.cls <= 0.25) {
      assessments.push("⚠️  CLS: Needs improvement (0.1 - 0.25)");
    } else {
      assessments.push("❌ CLS: Poor (> 0.25)");
    }

    // TBT assessment
    if (this.metrics.tbt <= 200) {
      assessments.push("✅ TBT: Excellent (< 200ms)");
    } else if (this.metrics.tbt <= 600) {
      assessments.push("⚠️  TBT: Needs improvement (200ms - 600ms)");
    } else {
      assessments.push("❌ TBT: Poor (> 600ms)");
    }

    assessments.forEach((assessment) => console.log(`   ${assessment}`));

    // Overall assessment
    const goodMetrics = assessments.filter((a) => a.includes("✅")).length;
    const totalMetrics = assessments.length;
    const percentage = (goodMetrics / totalMetrics) * 100;

    console.log(
      `\n📊 Overall: ${goodMetrics}/${totalMetrics} metrics are good (${percentage.toFixed(0)}%)`,
    );

    if (percentage >= 75) {
      console.log("🎉 Excellent performance!");
    } else if (percentage >= 50) {
      console.log("⚠️  Performance needs improvement");
    } else {
      console.log("❌ Performance needs significant improvement");
    }
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: this.metrics,
      summary: {
        fcp:
          this.metrics.fcp <= 1800
            ? "good"
            : this.metrics.fcp <= 3000
              ? "needs-improvement"
              : "poor",
        lcp:
          this.metrics.lcp <= 2500
            ? "good"
            : this.metrics.lcp <= 4000
              ? "needs-improvement"
              : "poor",
        cls:
          this.metrics.cls <= 0.1
            ? "good"
            : this.metrics.cls <= 0.25
              ? "needs-improvement"
              : "poor",
        tbt:
          this.metrics.tbt <= 200
            ? "good"
            : this.metrics.tbt <= 600
              ? "needs-improvement"
              : "poor",
      },
    };

    const reportPath =
      "./project-improvements/performance/performance-advanced-report.json";
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Performance report saved to: ${reportPath}`);
  }
}

async function main() {
  const monitor = new PerformanceMonitor();
  const url = process.argv[2] || "http://localhost:3000";

  try {
    console.log(`🚀 Starting advanced performance monitoring for: ${url}`);
    console.log("Make sure your development server is running (yarn dev)");

    await monitor.runLighthouse(url);
    monitor.displayResults();
    monitor.generateReport();
  } catch (error) {
    console.error("❌ Performance monitoring failed:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = PerformanceMonitor;
