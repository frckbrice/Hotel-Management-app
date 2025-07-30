# Authentication Debugging Guide

## Common Issues and Solutions

### 1. Check Environment Variables
Make sure these are set in your `.env` file:
```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
SANITY_STUDIO_TOKEN="your-sanity-token"
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
```

### 2. GitHub OAuth Setup
1. Go to GitHub Developer Settings: https://github.com/settings/developers
2. Find your OAuth app
3. Update Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`

### 3. Google OAuth Setup
1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Find your OAuth 2.0 client
3. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs

### 4. Sanity CORS Settings
1. Go to https://manage.sanity.io/
2. Find your project
3. Go to API settings
4. Add `http://localhost:3000` to CORS origins

### 5. Test Steps
1. Visit: http://localhost:3000/api/test-auth
2. Check browser console for errors
3. Check server logs for errors
4. Try signing up with a new account
5. Try logging in with existing account

### 6. Common Error Messages
- "Invalid credentials" - User not found or wrong password
- "User already exists" - Email already registered
- "Failed to sign up" - Sanity connection issue
- OAuth errors - Check provider configuration

### 7. Debug Commands
```bash
# Check if server is running
curl http://localhost:3000

# Test Sanity connection
curl http://localhost:3000/api/test-auth

# Check environment variables
cat .env | grep -E "(NEXTAUTH|GITHUB|GOOGLE|SANITY)"
```

### 8. Browser Console
Open browser dev tools and check:
- Network tab for failed requests
- Console tab for JavaScript errors
- Application tab for cookies/session

### 9. Server Logs
Check terminal where `yarn dev` is running for:
- NextAuth debug messages
- Sanity connection errors
- API route errors 