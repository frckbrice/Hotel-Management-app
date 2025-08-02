#!/usr/bin/env node

const https = require("https");
const http = require("http");

const URL = process.argv[2] || "http://localhost:3000";

console.log(`🔒 Checking security headers for: ${URL}`);
console.log("=".repeat(50));

function checkHeaders(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https:") ? https : http;

    const req = protocol.get(url, (res) => {
      const headers = res.headers;
      const securityHeaders = {
        "X-Content-Type-Options": headers["x-content-type-options"],
        "X-Frame-Options": headers["x-frame-options"],
        "X-XSS-Protection": headers["x-xss-protection"],
        "Referrer-Policy": headers["referrer-policy"],
        "Permissions-Policy": headers["permissions-policy"],
        "Strict-Transport-Security": headers["strict-transport-security"],
        "Content-Security-Policy": headers["content-security-policy"],
        "Cache-Control": headers["cache-control"],
      };

      console.log("📊 Security Headers Analysis:");
      console.log("");

      let score = 0;
      const totalHeaders = Object.keys(securityHeaders).length;

      Object.entries(securityHeaders).forEach(([header, value]) => {
        if (value) {
          console.log(`✅ ${header}: ${value}`);
          score++;
        } else {
          console.log(`❌ ${header}: Not set`);
        }
      });

      console.log("");
      console.log(
        `📈 Security Score: ${score}/${totalHeaders} (${Math.round((score / totalHeaders) * 100)}%)`,
      );

      if (score === totalHeaders) {
        console.log("🎉 All security headers are properly configured!");
      } else {
        console.log(
          "⚠️  Some security headers are missing. Consider adding them to your Next.js config.",
        );
      }

      resolve(securityHeaders);
    });

    req.on("error", (err) => {
      console.error("❌ Error checking headers:", err.message);
      reject(err);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });
  });
}

async function main() {
  try {
    await checkHeaders(URL);
  } catch (error) {
    console.error("❌ Failed to check security headers:", error.message);
    process.exit(1);
  }
}

main();
