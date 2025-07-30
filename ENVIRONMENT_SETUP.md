# 🔧 Environment Setup Guide

This guide will help you set up the environment variables needed for the Hotel Management System to work properly.

## 🚨 Critical Issue: Missing Environment Variables

The "Something went wrong" error during signup is likely caused by missing environment variables. Follow this guide to fix it.

## 📝 Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your-sanity-write-token-with-permissions
SANITY_STUDIO_TOKEN=your-sanity-studio-token

# OAuth Providers (Optional - for GitHub and Google auth)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe Configuration (Optional - for payments)
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# Email Configuration (Optional - for contact form)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=contact@hotel.com

# Google Maps (Optional - for maps)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## 🔑 How to Get These Values

### 1. NextAuth Configuration

```bash
# Generate a random secret
openssl rand -base64 32
```

### 2. Sanity Configuration

#### Get Project ID and Dataset:

1. Go to [sanity.io](https://sanity.io)
2. Open your project
3. Go to Settings → API
4. Copy the Project ID and Dataset name

#### Get Tokens:

1. Go to Settings → API
2. Create a new token with "Read + Write" permissions
3. Copy the token value

### 3. OAuth Providers (Optional)

#### GitHub OAuth:

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`

#### Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Set Authorized redirect URIs to: `http://localhost:3000/api/auth/callback/google`

### 4. Stripe Configuration (Optional)

1. Go to [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. For webhook secret, use Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhook`

## 🚀 Quick Setup for Testing

For basic functionality (without OAuth and payments), you only need:

```bash
# Minimum required for signup/login
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your-write-token
```

## 🔍 Testing Environment Variables

After setting up the `.env.local` file:

1. **Restart the development server**:

   ```bash
   yarn dev
   ```

2. **Test the environment endpoint**:

   ```bash
   curl http://localhost:3000/api/test-env
   ```

3. **Check the response** - all required fields should be `true`

## 🐛 Troubleshooting

### Issue: "Something went wrong" during signup

**Cause**: Missing or incorrect environment variables
**Solution**:

1. Check that `.env.local` exists in the root directory
2. Verify all required variables are set
3. Restart the development server

### Issue: "Server configuration error"

**Cause**: Missing Sanity tokens or project ID
**Solution**:

1. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
2. Verify `SANITY_WRITE_TOKEN` has write permissions
3. Check Sanity project settings

### Issue: "User already exists"

**Cause**: User with same email already exists
**Solution**:

1. Try with a different email
2. Or delete the user from Sanity Studio

### Issue: OAuth not working

**Cause**: Missing OAuth configuration
**Solution**:

1. Set up GitHub/Google OAuth apps
2. Add the client IDs and secrets to `.env.local`
3. Ensure callback URLs are correct

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

**After setting up the environment variables, restart the development server and try signing up again.**
