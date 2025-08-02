# 🔧 Troubleshooting Guide & Design Decisions

This document tracks all problems encountered during development, their solutions, and key design decisions made for the Hotel Management System.

## 🚨 Critical Issues & Solutions

### 1. Webpack & Browser Cache Issues

#### **Problem**: TypeError: Cannot read properties of undefined (reading 'call')

- **Issue**: `TypeError: Cannot read properties of undefined (reading 'call')` in webpack modules
- **Root Cause**: Browser cache conflicts with updated Next.js/React configuration
- **Solution**:
  ```bash
  # Clear browser cache completely
  # Chrome/Edge: Ctrl+Shift+Delete → Clear browsing data
  # Firefox: Ctrl+Shift+Delete → Clear browsing data
  # Safari: Cmd+Option+E → Empty caches
  ```
- **Additional Steps**:

  ```bash
  # Clear Next.js cache
  rm -rf .next
  rm -rf node_modules/.cache

  # Restart development server
  yarn dev
  ```

- **Prevention**: Always clear browser cache when making configuration changes
- **Files Affected**: All webpack modules, React components, Next.js chunks

#### **Problem**: Module not found: Can't resolve 'react/jsx-runtime'

- **Issue**: `Module not found: Can't resolve 'react/jsx-runtime'` during build
- **Root Cause**: Next.js 15 and React 19 compatibility issues
- **Solution**:
  ```javascript
  // Ensure proper Next.js configuration
  // next.config.js
  const nextConfig = {
    experimental: {
      optimizePackageImports: ["react-icons", "lucide-react"],
    },
  };
  ```
- **Alternative Solutions**:
  - Downgrade to React 18 if issues persist
  - Use proper import paths with `@/` aliases
  - Clear all caches and restart

### 2. Authentication System Issues

#### **Problem**: Signup API Returning HTML Instead of JSON

- **Issue**: `"Something went wrong error on signup. Unexpected token '<', "<!DOCTYPE "... is not valid JSON"`
- **Root Cause**: Middleware was protecting the signup API route, causing it to redirect to signin page
- **Solution**:
  ```typescript
  // Updated middleware to exclude signup route
  export const config = {
    matcher: [
      "/users/:path*",
      "/api/((?!sanity/signUp|test-env|contact|stripe|webhook).*)",
    ],
  };
  ```
- **Files Modified**: `src/middleware.ts`

#### **Problem**: Sanity Client Session Authentication Error

- **Issue**: `"Unauthorized - Session not found"` during signup
- **Root Cause**: `authSanityClient` was trying to use session-based authentication
- **Solution**:
  ```typescript
  // Created direct Sanity client in signup route
  const signupSanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_STUDIO_TOKEN,
    apiVersion: "2021-10-21",
    perspective: "published",
    stega: false,
  });
  ```
- **Files Modified**: `src/app/api/sanity/signUp/route.ts`

#### **Problem**: OAuth User ID Inconsistency

- **Issue**: Google OAuth user IDs had `user.` prefix while GitHub IDs did not
- **Error**: `AxiosError: Request failed with status code 404` - "User not found"
- **Root Cause**: Sanity queries expected consistent user ID format
- **Solution**:
  ```typescript
  // Normalized user IDs in auth.ts
  const normalizedUserId = userId.replace("user.", "");
  ```
- **Files Modified**: `src/libs/auth.ts`, `src/app/api/users/route.ts`

#### **Problem**: Sanity Write Permissions

- **Issue**: `AxiosError: Request failed with status code 403` - "Insufficient permissions"
- **Root Cause**: `SANITY_STUDIO_TOKEN` lacked write permissions
- **Solution**:
  - Created `SANITY_WRITE_TOKEN` with "Read + Write" permissions
  - Updated API functions to prioritize `SANITY_WRITE_TOKEN`
- **Files Modified**: `src/libs/apis.ts`, `src/libs/sanity.ts`

### 3. Payment & Booking System Issues

#### **Problem**: Stripe Webhook Not Triggering

- **Issue**: "Payment successful" toast showed but booking didn't appear in table
- **Root Cause**: Webhook not being triggered locally
- **Solution**:
  ```bash
  # Use Stripe CLI to forward webhooks locally
  stripe listen --forward-to localhost:3001/api/webhook
  ```
- **Files Modified**: `src/app/api/webhook/route.ts`, `src/libs/apis.ts`

#### **Problem**: Booking Data Not Persisting

- **Issue**: `AxiosError: Request failed with status code 409` - "Conflict"
- **Root Cause**: User ID format mismatch between client and server
- **Solution**:
  ```typescript
  // Ensure consistent user ID format for Sanity references
  const userRef = `user.${normalizedUserId}`;
  ```

#### **Problem**: Stripe Client-Side Error

- **Issue**: `Error: Neither apiKey nor config.authenticator provided`
- **Root Cause**: Stripe secret key exposed on client-side
- **Solution**:
  ```typescript
  // Separated client and server Stripe instances
  export const getStripe = () =>
    loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);
  export const getServerStripe = () =>
    new Stripe(process.env.STRIPE_SECRET_KEY!);
  ```

### 4. Testing Infrastructure Issues

#### **Problem**: Unit Test Failures

- **Issue**: Multiple elements found for same text, component mocking issues
- **Root Cause**: Inadequate mocking and non-specific selectors
- **Solution**:

  ```typescript
  // Used getAllByText for multiple instances
  const homeLinks = screen.getAllByText("Home");
  expect(homeLinks.length).toBeGreaterThan(0);

  // Proper mocking of dependencies
  vi.mock("next-auth/react", () => ({
    useSession: () => ({ data: null, status: "unauthenticated" }),
  }));
  ```

#### **Problem**: E2E Test Configuration

- **Issue**: Playwright tests being picked up by Vitest
- **Root Cause**: Incorrect test directory structure and configuration
- **Solution**:
  ```typescript
  // Updated Vitest config to exclude E2E tests
  exclude: ["**/tests/e2e/**", "**/playwright.config.ts"];
  ```

### 5. Docker & Deployment Issues

#### **Problem**: Node.js Version Deprecation

- **Issue**: `Error: Node.js version 18.x is deprecated`
- **Root Cause**: Outdated Node.js version in deployment
- **Solution**:
  ```json
  // Updated package.json
  "engines": { "node": ">=22.0.0" }
  ```

#### **Problem**: Tailwind CSS Utility Class Error

- **Issue**: `Cannot apply utility class md:px-[50px] because the md variant does not exist`
- **Root Cause**: Tailwind configuration not recognizing custom breakpoints
- **Solution**:
  ```typescript
  // Updated tailwind.config.ts
  screens: { 'xs': '475px' }
  ```

## 🏗️ Key Design Decisions

### Docker Architecture

- **Multi-Stage Build**: Security and size optimization
- **Package Manager Flexibility**: Supports yarn, npm, pnpm
- **Non-Root User**: Security best practice

### Testing Strategy

- **Unit Tests**: Vitest with React Testing Library
- **E2E Tests**: Playwright with cross-browser support
- **Coverage**: 95%+ unit test coverage

### CI/CD Pipeline

- **Multi-Stage**: Lint, test, e2e, deploy, security
- **Environment Variables**: Secure configuration management
- **Automated Deployment**: Vercel integrationus

## 🔧 Common Issues & Quick Fixes

### Development Issues

#### **Webpack Errors & Browser Cache Issues**

```bash
# Solution: Clear browser cache and Next.js cache
# 1. Clear browser cache (Ctrl+Shift+Delete)
# 2. Clear Next.js cache
rm -rf .next
rm -rf node_modules/.cache
# 3. Restart development server
yarn dev
```

#### **Hot Reload Not Working**

```bash
# Solution: Clear Next.js cache
rm -rf .next
yarn dev
```

#### **Dependencies Out of Sync**

```bash
# Solution: Clean install
rm -rf node_modules yarn.lock
yarn install
```

#### **Environment Variables Not Loading**

```bash
# Solution: Check .env.local file
cp .env.example .env.local
# Fill in required values
```

### Testing Issues

#### **Unit Tests Failing**

```bash
# Solution: Clear test cache
yarn test --clearCache
```

#### **E2E Tests Timing Out**

```bash
# Solution: Ensure dev server is running
yarn dev &
yarn test:e2e
```

#### **Playwright Browsers Missing**

```bash
# Solution: Install browsers
npx playwright install
```

### Docker Issues

#### **Build Failing**

```bash
# Solution: Clear Docker cache
docker system prune -a
docker-compose build --no-cache
```

#### **Container Not Starting**

```bash
# Solution: Check logs
docker-compose logs app-dev
```

### Deployment Issues

#### **Vercel Build Failing**

```bash
# Solution: Check build logs
vercel logs --follow
```

#### **Environment Variables Missing**

```bash
# Solution: Add to Vercel dashboard
vercel env add NEXTAUTH_URL
```

## 📝 Configuration Change Procedures

When making configuration changes (especially to Next.js, React, or webpack):

1. **Before Changes**:
   - Document current working state
   - Create a backup branch if needed

2. **During Changes**:
   - Make incremental changes
   - Test after each significant change

3. **After Changes**:
   - Clear browser cache completely
   - Clear Next.js cache: `rm -rf .next`
   - Clear node_modules cache: `rm -rf node_modules/.cache`
   - Restart development server: `yarn dev`
   - Test thoroughly in different browsers

4. **Common Configuration Changes Requiring Cache Clear**:
   - Next.js version updates
   - React version changes
   - Webpack configuration modifications
   - NextAuth provider changes
   - Layout structure changes (client vs server components)
   - Import path modifications

## 📋 Environment Variable Checklist

- [ ] `.env.local` file created in root directory
- [ ] `NEXTAUTH_URL` set to `http://localhost:3000`
- [ ] `NEXTAUTH_SECRET` set to a random string
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` set to your Sanity project ID
- [ ] `NEXT_PUBLIC_SANITY_DATASET` set to `production`
- [ ] `SANITY_WRITE_TOKEN` set with write permissions
- [ ] Development server restarted after adding variables

## 🔒 Security Notes

1. **Never commit `.env.local`** - it's already in `.gitignore`
2. **Use different secrets for production**
3. **Rotate tokens regularly**
4. **Use environment-specific values**

## 🚀 Production Deployment

For production (Vercel), add these environment variables in the Vercel dashboard:

1. Go to your project in Vercel
2. Navigate to Settings → Environment Variables
3. Add each variable from `.env.local`
4. Set the appropriate environment (Production, Preview, Development)

---

**Last Updated**: January 2025 (Updated with Webpack Cache Solutions)  
**Version**: 1.2.0  
**Maintainer**: Avom Brice
