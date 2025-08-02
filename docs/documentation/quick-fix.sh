#!/bin/bash

echo "🚀 Quick Fix for Signup Issue"
echo "=============================="
echo ""

# Generate a random NextAuth secret
NEXTAUTH_SECRET=$(openssl rand -base64 32)

echo "🔑 Generated NextAuth Secret: $NEXTAUTH_SECRET"
echo ""

# Create minimal .env.local for basic functionality
cat > .env.local << EOF
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# Sanity Configuration (YOU NEED TO FILL THESE)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your-sanity-write-token

# Optional OAuth (can be added later)
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
EOF

echo "✅ Created minimal .env.local file"
echo ""
echo "⚠️  IMPORTANT: You still need to configure Sanity variables!"
echo ""
echo "🔧 Next steps:"
echo "1. Go to https://sanity.io"
echo "2. Open your project"
echo "3. Go to Settings → API"
echo "4. Copy your Project ID"
echo "5. Create a new token with 'Read + Write' permissions"
echo "6. Update .env.local with your values"
echo ""
echo "📝 Current .env.local contents:"
echo "--------------------------------"
cat .env.local
echo "--------------------------------"
echo ""
echo "🔄 After updating the Sanity variables, restart the server:"
echo "   yarn dev"
echo ""
echo "🧪 Test the setup:"
echo "   curl http://localhost:3000/api/test-env" 