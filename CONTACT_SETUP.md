# Contact Form & Google Maps Setup

## Environment Variables Required

Add these variables to your `.env` file:

```env
# Email Configuration (for contact form)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
CONTACT_EMAIL="contact@luxuryhotel.com"

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
```

## Email Setup (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password as `EMAIL_PASS`

## Google Maps API Setup

1. **Create Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Maps JavaScript API**:
   - Go to APIs & Services → Library
   - Search for "Maps JavaScript API"
   - Enable it

3. **Create API Key**:
   - Go to APIs & Services → Credentials
   - Click "Create Credentials" → API Key
   - Copy the API key

4. **Restrict API Key** (Recommended):
   - Click on the created API key
   - Under "Application restrictions" select "HTTP referrers"
   - Add your domain (e.g., `localhost:3000/*` for development)
   - Under "API restrictions" select "Restrict key"
   - Select "Maps JavaScript API"

## Features Added

### Contact Form
- ✅ Real email sending via Nodemailer
- ✅ Form validation
- ✅ Loading states
- ✅ Success/error messages
- ✅ Responsive design
- ✅ Theme-aware styling

### Google Maps
- ✅ Interactive map centered on Yaoundé, Cameroon
- ✅ Custom hotel marker
- ✅ Info window on marker click
- ✅ Responsive design
- ✅ Theme-aware styling

## Usage

1. Fill out the contact form
2. Click "Send Message"
3. Email will be sent to the configured `CONTACT_EMAIL`
4. Interactive map shows hotel location

## Troubleshooting

### Email Issues
- Ensure Gmail app password is correct
- Check if 2FA is enabled
- Verify `EMAIL_USER` is correct

### Maps Issues
- Ensure Google Maps API key is valid
- Check if Maps JavaScript API is enabled
- Verify API key restrictions allow your domain 