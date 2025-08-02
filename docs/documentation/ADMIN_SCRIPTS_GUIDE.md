# 🛠️ Admin Scripts Guide & Testing Summary

This comprehensive guide explains how administrators should use the script files in the `Hotel-Management-app/scripts/` directory for monitoring, security, and performance management, along with current testing results and actionable insights.

## 📊 Current Testing Results Overview

### ✅ **Successfully Tested Scripts**

| Script                      | Status     | Score     | Issues Found                    |
| --------------------------- | ---------- | --------- | ------------------------------- |
| `check-security-headers.js` | ✅ Working | 86% (6/7) | 1 missing header                |
| `performance-monitor.js`    | ✅ Working | 37%       | Performance issues              |
| `yarn test:security`        | ✅ Working | -         | 3 vulnerabilities               |
| `lighthouse`                | ✅ Working | 37%       | Performance optimization needed |

## 🔒 Security Headers Test Results

### **Current Security Score: 86% (6/7 headers)**

#### ✅ **Properly Configured Headers:**

- **X-Frame-Options**: `DENY` ✅
- **X-Content-Type-Options**: `nosniff` ✅
- **X-XSS-Protection**: `1; mode=block` ✅
- **Referrer-Policy**: `strict-origin-when-cross-origin` ✅
- **Content-Security-Policy**: Comprehensive CSP configured ✅
- **Permissions-Policy**: `camera=(), microphone=(), geolocation=()` ✅

#### ❌ **Missing Header:**

- **Strict-Transport-Security**: Not set (only for HTTPS in production)

### **Security Assessment: GOOD**

- Most critical security headers are properly configured
- CSP is comprehensive and well-structured
- Only missing HSTS (appropriate for development)

## 🚀 Performance Test Results

### **Current Performance Score: 37%**

#### 📈 **Core Web Vitals Analysis:**

| Metric  | Value   | Status       | Target   |
| ------- | ------- | ------------ | -------- |
| **FCP** | 1726ms  | ✅ Good      | < 1800ms |
| **LCP** | 36317ms | ❌ Poor      | < 2500ms |
| **CLS** | 0.000   | ✅ Excellent | < 0.1    |
| **TBT** | 13323ms | ❌ Poor      | < 200ms  |

#### ⚡ **Additional Metrics:**

- **Speed Index**: 7047ms (Poor)
- **Time to Interactive**: 37412ms (Poor)
- **Time to First Byte**: 417ms (Good)

### **Performance Assessment: NEEDS IMPROVEMENT**

- **2/4 Core Web Vitals are good (50%)**
- Major issues with LCP and TBT
- Significant optimization opportunities

## 🔍 Security Audit Results

### **Vulnerabilities Found: 3 Moderate**

#### **Issues Identified:**

1. **esbuild vulnerability** (3 instances)
   - **Severity**: Moderate
   - **Package**: esbuild
   - **Path**: vite > esbuild, vitest > vite > esbuild
   - **Issue**: Development server security concern

#### **Recommendations:**

1. **Update esbuild** to latest version
2. **Review development server** security settings
3. **Consider production-only** deployment for sensitive operations

## 📁 Available Scripts

### 1. `check-security-headers.js`

**Purpose**: Validates security headers for the application
**Use Case**: Security audits, compliance checks, vulnerability assessments

### 2. `performance-monitor.js`

**Purpose**: Monitors Core Web Vitals and performance metrics
**Use Case**: Performance optimization, user experience monitoring, performance regression detection

## 🔒 Security Headers Check Script

### **What It Does**

The `check-security-headers.js` script validates that your application has proper security headers configured to protect against common web vulnerabilities.

### **Security Headers Checked**

- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-XSS-Protection**: Additional XSS protection
- **Referrer-Policy**: Controls referrer information
- **Content-Security-Policy**: Prevents XSS and injection attacks
- **Permissions-Policy**: Controls feature access
- **Strict-Transport-Security**: Enforces HTTPS

### **How to Use**

#### **Basic Usage**

```bash
# Check local development server
yarn test:headers

# Or run directly
node scripts/check-security-headers.js

# Check specific URL
node scripts/check-security-headers.js http://localhost:3000
```

#### **Production Usage**

```bash
# Check production environment
node scripts/check-security-headers.js https://your-domain.com

# Check staging environment
node scripts/check-security-headers.js https://staging.your-domain.com
```

#### **CI/CD Integration**

```bash
# Add to your deployment pipeline
yarn test:headers || exit 1
```

### **Expected Output**

```
🔒 Checking security headers for: http://localhost:3000
==================================================
Status Code: 200
Security Score: 6/7 (86%)

📋 Security Headers:
✅ X-Frame-Options: DENY
✅ X-Content-Type-Options: nosniff
✅ X-XSS-Protection: 1; mode=block
✅ Referrer-Policy: strict-origin-when-cross-origin
✅ Content-Security-Policy: Comprehensive CSP configured
✅ Permissions-Policy: camera=(), microphone=(), geolocation=()
❌ Strict-Transport-Security: NOT SET

⚠️  Missing Required Headers:
❌ Strict-Transport-Security

📊 Summary:
✅ Most security headers are configured properly.
```

### **Admin Actions Based on Results**

#### **If Score < 50% (Critical)**

1. **Immediate Action Required**
   - Review middleware configuration
   - Check server security settings
   - Implement missing headers

2. **Configuration Fix**

   ```javascript
   // In src/middleware.ts
   export function middleware(request: NextRequest) {
     const response = NextResponse.next();

     // Add missing headers
     response.headers.set('Content-Security-Policy', "default-src 'self'");
     response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
     response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

     return response;
   }
   ```

#### **If Score 50-80% (Warning)**

1. **Review Missing Headers**
   - Identify which headers are missing
   - Prioritize implementation based on risk

2. **Gradual Implementation**
   - Add headers one by one
   - Test after each addition
   - Monitor for any issues

#### **If Score > 80% (Good)**

1. **Maintenance Mode**
   - Regular monitoring
   - Keep up with security updates
   - Consider additional security measures

## 🚀 Performance Monitor Script

### **What It Does**

The `performance-monitor.js` script runs Lighthouse audits and analyzes Core Web Vitals to ensure optimal user experience.

### **Metrics Tracked**

- **FCP** (First Contentful Paint): Time to first content
- **LCP** (Largest Contentful Paint): Time to largest content
- **CLS** (Cumulative Layout Shift): Visual stability
- **TBT** (Total Blocking Time): Interactivity
- **Speed Index**: Perceived loading speed
- **Time to Interactive**: When page becomes interactive

### **How to Use**

#### **Basic Usage**

```bash
# Run performance monitoring
yarn test:performance:monitor

# Or run directly
node scripts/performance-monitor.js

# Check specific URL
node scripts/performance-monitor.js https://your-domain.com
```

#### **Scheduled Monitoring**

```bash
# Add to cron job for regular monitoring
# Run every hour
0 * * * * cd /path/to/Hotel-Management-app && node scripts/performance-monitor.js

# Run daily at 2 AM
0 2 * * * cd /path/to/Hotel-Management-app && node scripts/performance-monitor.js
```

#### **CI/CD Integration**

```bash
# Add to deployment pipeline
yarn test:performance:monitor || echo "Performance check completed"
```

### **Expected Output**

```
🚀 Starting performance monitoring for: http://localhost:3000
Make sure your development server is running (yarn dev)
🔍 Running Lighthouse performance audit...

📊 Performance Metrics Report
==================================================
🎯 Performance Score: 37%

🚀 Core Web Vitals:
   FCP (First Contentful Paint): 1726ms ✅ Good
   LCP (Largest Contentful Paint): 36317ms ❌ Poor
   CLS (Cumulative Layout Shift): 0.000 ✅ Excellent
   TBT (Total Blocking Time): 13323ms ❌ Poor

⚡ Additional Metrics:
   Speed Index: 7047ms (Poor)
   Time to Interactive: 37412ms (Poor)
   Time to First Byte: 417ms (Good)

📈 Performance Assessment:
   ✅ FCP: Good (< 1.8s)
   ❌ LCP: Poor (> 2.5s)
   ✅ CLS: Excellent (< 0.1)
   ❌ TBT: Poor (> 200ms)

📊 Overall: 2/4 metrics are good (50%)
⚠️  Performance needs improvement

📄 Performance report saved to: ./performance-report.json
```

### **Admin Actions Based on Results**

#### **If Performance Score < 70% (Critical)**

1. **Immediate Investigation**
   - Check server response times
   - Review bundle sizes
   - Analyze image optimization

2. **Quick Fixes**

   ```bash
   # Clear cache
   rm -rf .next
   rm -rf node_modules/.cache

   # Rebuild
   yarn build

   # Check bundle size
   yarn build --analyze
   ```

#### **If Performance Score 70-90% (Warning)**

1. **Optimization Opportunities**
   - Implement lazy loading
   - Optimize images
   - Reduce JavaScript bundle size

2. **Monitoring Setup**
   ```bash
   # Set up regular monitoring
   echo "0 */6 * * * cd $(pwd) && node scripts/performance-monitor.js" | crontab -
   ```

#### **If Performance Score > 90% (Excellent)**

1. **Maintenance Mode**
   - Continue regular monitoring
   - Watch for regressions
   - Consider advanced optimizations

## 🛠️ Admin Actions Required

### **Immediate Actions (High Priority)**

#### **1. Performance Optimization**

```bash
# Clear cache and rebuild
rm -rf .next node_modules/.cache
yarn build

# Analyze bundle size
yarn build --analyze

# Optimize images and assets
# Review and optimize large components
```

#### **2. Security Updates**

```bash
# Update dependencies
yarn upgrade

# Fix security vulnerabilities
yarn audit fix

# Review development server configuration
```

### **Medium Priority Actions**

#### **3. Performance Monitoring Setup**

```bash
# Set up regular monitoring
echo "0 */6 * * * cd $(pwd) && node scripts/performance-monitor.js" | crontab -

# Create performance baseline
node scripts/performance-monitor.js > performance-baseline.json
```

#### **4. Security Monitoring Setup**

```bash
# Set up security header monitoring
echo "0 2 * * * cd $(pwd) && yarn test:headers" | crontab -

# Create security baseline
yarn test:headers > security-baseline.txt
```

### **Long-term Actions**

#### **5. Performance Optimization Plan**

- **Image Optimization**: Implement next-gen formats (WebP, AVIF)
- **Code Splitting**: Reduce JavaScript bundle size
- **Lazy Loading**: Implement for non-critical components
- **Caching Strategy**: Optimize static asset caching

#### **6. Security Enhancement Plan**

- **HSTS Implementation**: Add for production environments
- **Rate Limiting**: Implement comprehensive rate limiting
- **Input Validation**: Strengthen all input validation
- **Monitoring**: Set up security event monitoring

## 📋 Testing Commands for Admins

### **Daily Monitoring Commands**

```bash
# Security check
yarn test:headers

# Performance check
yarn test:performance:monitor

# Security audit
yarn test:security
```

### **Weekly Deep Dive Commands**

```bash
# Full Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Security vulnerability check
yarn test:security:check

# Performance with detailed report
node scripts/performance-monitor.js > weekly-performance-report.json
```

### **Monthly Comprehensive Testing**

```bash
# All tests
yarn test:all

# Generate comprehensive reports
yarn test:lighthouse
yarn test:coverage
yarn test:e2e
```

## 🎯 Performance Optimization Targets

### **Short-term Goals (1-2 weeks)**

- **LCP**: Reduce from 36s to < 2.5s
- **TBT**: Reduce from 13s to < 200ms
- **Speed Index**: Reduce from 7s to < 3s

### **Medium-term Goals (1 month)**

- **Performance Score**: Improve from 37% to > 80%
- **Core Web Vitals**: 4/4 metrics in "Good" range
- **Lighthouse Score**: > 90 across all categories

### **Long-term Goals (3 months)**

- **Performance Score**: > 95%
- **Security Score**: 100% (all headers configured)
- **Zero Critical Vulnerabilities**

## 📊 Monitoring Dashboard Setup

### **Recommended Metrics to Track**

1. **Core Web Vitals** (FCP, LCP, CLS, TBT)
2. **Security Headers** (7 key headers)
3. **Lighthouse Scores** (Performance, Accessibility, Best Practices, SEO)
4. **Security Vulnerabilities** (Count and severity)
5. **Error Rates** (404, 500, etc.)

### **Alert Thresholds**

- **Performance Score**: < 70% (Alert)
- **Security Score**: < 80% (Alert)
- **Vulnerabilities**: > 0 Critical (Alert)
- **Core Web Vitals**: Any metric in "Poor" range (Alert)

## 📊 Reporting and Monitoring

### **Automated Reports**

Both scripts generate reports that can be:

- **Emailed** to stakeholders
- **Stored** in monitoring systems
- **Integrated** with alerting systems

### **Report Locations**

- **Security Headers**: Console output + exit codes
- **Performance**: `./performance-report.json` + `./lighthouse-report.html`

### **Exit Codes**

- **0**: Success (all checks passed)
- **1**: Failure (issues detected)

## 🔧 Advanced Usage

### **Custom Configuration**

#### **Security Headers Customization**

```javascript
// Modify scripts/check-security-headers.js
const SECURITY_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  // Add your custom headers
  "Custom-Security-Header": "your-value",
};
```

#### **Performance Thresholds**

```javascript
// Modify scripts/performance-monitor.js
const PERFORMANCE_THRESHOLDS = {
  fcp: 1500, // 1.5 seconds
  lcp: 2000, // 2 seconds
  cls: 0.05, // 0.05
  tbt: 150, // 150ms
};
```

### **Integration with Monitoring Tools**

#### **Grafana Integration**

```bash
# Send metrics to Grafana
node scripts/performance-monitor.js | curl -X POST -H "Content-Type: application/json" -d @- http://grafana:3000/api/datasources/proxy/1/api/v1/write
```

#### **Slack Notifications**

```bash
# Send alerts to Slack
node scripts/check-security-headers.js || curl -X POST -H 'Content-type: application/json' --data '{"text":"Security headers check failed!"}' $SLACK_WEBHOOK_URL
```

## 🚨 Troubleshooting

### **Common Issues**

#### **Security Headers Script Fails**

```bash
# Check if server is running
curl -I http://localhost:3000

# Check script permissions
chmod +x scripts/check-security-headers.js

# Run with verbose output
node scripts/check-security-headers.js --verbose
```

#### **Performance Monitor Fails**

```bash
# Ensure Chrome is available
npx playwright install chromium

# Check Lighthouse installation
npm list lighthouse

# Run with debug output
DEBUG=lighthouse* node scripts/performance-monitor.js
```

### **Performance Issues**

```bash
# Clear all caches
rm -rf .next node_modules/.cache

# Reinstall dependencies
rm -rf node_modules yarn.lock
yarn install

# Rebuild application
yarn build
```

### **Security Issues**

```bash
# Check middleware configuration
cat src/middleware.ts

# Verify environment variables
cat .env.example

# Test security headers manually
curl -I http://localhost:3000
```

### **Script Issues**

```bash
# Check script permissions
chmod +x scripts/*.js

# Verify dependencies
yarn list lighthouse

# Run with debug output
DEBUG=* node scripts/performance-monitor.js
```

## 📋 Admin Checklist

### **Daily Tasks**

- [ ] Run security headers check
- [ ] Monitor performance metrics
- [ ] Review error logs
- [ ] Check system resources

### **Weekly Tasks**

- [ ] Generate performance reports
- [ ] Review security vulnerabilities
- [ ] Update dependencies
- [ ] Backup configuration

### **Monthly Tasks**

- [ ] Comprehensive security audit
- [ ] Performance optimization review
- [ ] Update monitoring thresholds
- [ ] Review and update documentation

## 🔐 Security Best Practices

### **Script Security**

1. **Never expose scripts publicly**
2. **Use environment variables for sensitive data**
3. **Regularly update dependencies**
4. **Monitor script execution logs**

### **Access Control**

```bash
# Restrict script access
chmod 750 scripts/
chmod 700 scripts/*.js

# Create admin user
sudo useradd -m -s /bin/bash admin
sudo usermod -aG docker admin
```

## 📈 Success Metrics

### **Key Performance Indicators**

- **Security Headers Score**: > 90%
- **Performance Score**: > 80%
- **Core Web Vitals**: All in "Good" range
- **Vulnerability Count**: 0 Critical, < 5 Moderate
- **Uptime**: > 99.9%

### **Monitoring Frequency**

- **Security Headers**: Daily
- **Performance Metrics**: Weekly
- **Security Audit**: Weekly
- **Comprehensive Testing**: Monthly

## 📞 Support

### **Getting Help**

- **Documentation**: Check `docs/TROUBLESHOOTING.md`
- **Issues**: Create GitHub issue with script output
- **Emergency**: Contact system administrator

### **Escalation Path**

1. **Check logs** for error details
2. **Review configuration** files
3. **Test in isolation** environment
4. **Contact development team**

---

**Test Date**: January 2025  
**Admin**: System Administrator  
**Status**: ✅ Scripts Working, ⚠️ Performance Issues Detected, 🔒 Security Good  
**Next Review**: Weekly  
**Last Updated**: January 2025  
**Maintainer**: Avom Brice  
**Version**: 2.0.0 (Merged)
