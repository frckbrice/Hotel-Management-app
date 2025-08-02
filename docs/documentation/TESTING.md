# 🧪 Testing Guide

This document outlines all testing capabilities for the Hotel Management System, including unit tests, E2E tests, security tests, and performance monitoring.

## 📋 Test Categories

### 1. Unit Tests (Vitest)

```bash
# Run unit tests
yarn test

# Run with UI
yarn test:ui

# Run with coverage
yarn test:coverage
```

**Coverage**: 95%+ unit test coverage
**Framework**: Vitest with React Testing Library
**Location**: `src/test/`

### 2. E2E Tests (Playwright)

```bash
# Run E2E tests
yarn test:e2e

# Run with UI
yarn test:e2e:ui
```

**Framework**: Playwright
**Browsers**: Chrome, Firefox, Safari
**Location**: `tests/e2e/`

### 3. Security Tests

```bash
# Run security audit
yarn test:security

# Check security vulnerabilities
yarn test:security:check

# Fix security issues
yarn test:security:fix

# Check security headers
yarn test:headers
```

**Features**:

- Dependency vulnerability scanning
- Security header validation
- ESLint security rules
- Environment variable validation

### 4. Performance Tests (Lighthouse)

```bash
# Full Lighthouse audit
yarn test:lighthouse

# Performance only
yarn test:lighthouse:performance

# Accessibility only
yarn test:lighthouse:accessibility

# Best practices only
yarn test:lighthouse:best-practices

# SEO only
yarn test:lighthouse:seo

# Performance monitoring with Core Web Vitals
yarn test:performance:monitor
```

**Metrics Tracked**:

- **FCP** (First Contentful Paint)
- **LCP** (Largest Contentful Paint)
- **CLS** (Cumulative Layout Shift)
- **TBT** (Total Blocking Time)
- **Speed Index**
- **Time to Interactive**

## 🚀 Performance Monitoring

### Core Web Vitals Targets

| Metric | Target  | Good    | Needs Improvement | Poor    |
| ------ | ------- | ------- | ----------------- | ------- |
| FCP    | < 1.8s  | < 1.8s  | 1.8s - 3s         | > 3s    |
| LCP    | < 2.5s  | < 2.5s  | 2.5s - 4s         | > 4s    |
| CLS    | < 0.1   | < 0.1   | 0.1 - 0.25        | > 0.25  |
| TBT    | < 200ms | < 200ms | 200ms - 600ms     | > 600ms |

### Running Performance Tests

```bash
# Quick performance check
yarn test:performance

# Detailed performance monitoring
yarn test:performance:monitor

# CI-friendly performance test
yarn test:lighthouse:ci
```

### Performance Report

The performance monitor generates:

- **HTML Reports**: Visual Lighthouse reports
- **JSON Reports**: Machine-readable data
- **Performance Summary**: Core Web Vitals assessment
- **Recommendations**: Improvement suggestions

## 🔒 Security Testing

### Security Headers Check

```bash
yarn test:headers
```

**Checks for**:

- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Content-Security-Policy
- Permissions-Policy
- Strict-Transport-Security

### Dependency Security

```bash
# Check for vulnerabilities
yarn test:security:check

# Fix vulnerabilities
yarn test:security:fix
```

### ESLint Security Rules

The project includes `eslint-plugin-security` with rules for:

- Object injection detection
- Unsafe regex patterns
- Eval usage prevention
- Timing attack detection
- Child process security

## 📊 Test Reports

### Coverage Reports

```bash
yarn test:coverage
```

- Generates HTML coverage report
- Shows line, branch, and function coverage
- Identifies uncovered code areas

### Performance Reports

```bash
yarn test:lighthouse
```

- Generates HTML Lighthouse report
- Includes performance, accessibility, best practices, SEO
- Provides actionable recommendations

### Security Reports

```bash
yarn test:security
```

- Lists vulnerable dependencies
- Suggests fixes
- Provides severity levels

## 🛠️ Test Configuration

### Vitest Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
```

### Playwright Configuration

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
});
```

### Lighthouse Configuration

```javascript
// .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000"],
      startServerCommand: "yarn dev",
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
      },
    },
  },
};
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "22"
      - run: yarn install
      - run: yarn test:coverage
      - run: yarn test:security
      - run: yarn test:lighthouse:ci
      - run: yarn test:e2e
```

### Pre-commit Hooks

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

## 📈 Performance Benchmarks

### Target Metrics

- **Performance Score**: ≥ 90
- **Accessibility Score**: ≥ 95
- **Best Practices Score**: ≥ 90
- **SEO Score**: ≥ 90

### Core Web Vitals Targets

- **FCP**: < 1.8s
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **TBT**: < 200ms

## 🚨 Troubleshooting

### Common Issues

#### Lighthouse Fails to Start

```bash
# Ensure Chrome is installed
npx playwright install chromium

# Check if dev server is running
yarn dev
```

#### Security Headers Missing

```bash
# Check current headers
curl -I http://localhost:3000

# Verify middleware configuration
# Check src/middleware.ts
```

#### Performance Tests Failing

```bash
# Clear cache
rm -rf .next

# Restart dev server
yarn dev

# Run with verbose output
yarn test:lighthouse --verbose
```

## 📝 Best Practices

### Writing Tests

1. **Unit Tests**: Test individual functions and components
2. **Integration Tests**: Test API endpoints and data flow
3. **E2E Tests**: Test complete user journeys
4. **Security Tests**: Test authentication and authorization
5. **Performance Tests**: Monitor Core Web Vitals

### Test Organization

```
src/
├── test/
│   ├── unit/          # Unit tests
│   ├── integration/   # Integration tests
│   └── setup.ts       # Test setup
tests/
└── e2e/              # E2E tests
```

### Performance Monitoring

1. **Regular Monitoring**: Run performance tests weekly
2. **Regression Testing**: Compare against baseline
3. **Continuous Monitoring**: Integrate with CI/CD
4. **Alerting**: Set up performance alerts

---

**Last Updated**: January 2025  
**Maintainer**: Avom Brice
