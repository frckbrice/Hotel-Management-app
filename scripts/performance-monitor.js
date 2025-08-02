#!/usr/bin/env node

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const URL = process.argv[2] || "http://localhost:3000";
const OUTPUT_DIR = "./project-improvements/performance";

console.log(`📊 Performance Monitor for: ${URL}`);
console.log("=".repeat(50));

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function measureResponseTime(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const protocol = url.startsWith("https:") ? https : http;

    const req = protocol.get(url, (res) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      const metrics = {
        url: url,
        timestamp: new Date().toISOString(),
        responseTime: responseTime,
        statusCode: res.statusCode,
        contentLength: res.headers["content-length"] || "unknown",
        server: res.headers.server || "unknown",
        date: res.headers.date || new Date().toISOString(),
      };

      resolve(metrics);
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });
  });
}

function saveMetrics(metrics) {
  const filename = `performance-metrics-${new Date().toISOString().split("T")[0]}.json`;
  const filepath = path.join(OUTPUT_DIR, filename);

  let existingData = [];
  if (fs.existsSync(filepath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(filepath, "utf8"));
    } catch (error) {
      console.warn("⚠️  Could not parse existing metrics file, starting fresh");
    }
  }

  existingData.push(metrics);

  fs.writeFileSync(filepath, JSON.stringify(existingData, null, 2));
  console.log(`💾 Metrics saved to: ${filepath}`);
}

function calculateAverageResponseTime(metrics) {
  if (metrics.length === 0) return 0;
  const total = metrics.reduce((sum, m) => sum + m.responseTime, 0);
  return total / metrics.length;
}

async function main() {
  try {
    console.log("🔄 Measuring response time...");
    const metrics = await measureResponseTime(URL);

    console.log("📈 Performance Metrics:");
    console.log(`   Response Time: ${metrics.responseTime}ms`);
    console.log(`   Status Code: ${metrics.statusCode}`);
    console.log(`   Content Length: ${metrics.contentLength}`);
    console.log(`   Server: ${metrics.server}`);
    console.log(`   Timestamp: ${metrics.timestamp}`);

    // Performance assessment
    let performanceGrade = "A";
    if (metrics.responseTime > 2000) performanceGrade = "C";
    else if (metrics.responseTime > 1000) performanceGrade = "B";

    console.log(`\n📊 Performance Grade: ${performanceGrade}`);

    if (metrics.responseTime < 500) {
      console.log("🚀 Excellent performance!");
    } else if (metrics.responseTime < 1000) {
      console.log("✅ Good performance");
    } else if (metrics.responseTime < 2000) {
      console.log("⚠️  Moderate performance - consider optimization");
    } else {
      console.log("❌ Poor performance - immediate optimization needed");
    }

    // Save metrics
    saveMetrics(metrics);

    // Generate summary report
    const summary = {
      lastCheck: metrics.timestamp,
      averageResponseTime: metrics.responseTime,
      performanceGrade: performanceGrade,
      recommendations: [],
    };

    if (metrics.responseTime > 1000) {
      summary.recommendations.push("Consider implementing caching strategies");
      summary.recommendations.push("Optimize image loading and compression");
      summary.recommendations.push("Review and optimize JavaScript bundles");
    }

    const summaryPath = path.join(OUTPUT_DIR, "performance-summary.json");
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`📋 Summary saved to: ${summaryPath}`);
  } catch (error) {
    console.error("❌ Performance monitoring failed:", error.message);
    process.exit(1);
  }
}

main();
