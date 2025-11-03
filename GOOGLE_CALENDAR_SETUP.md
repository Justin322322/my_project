# Google Calendar API Integration Guide

This guide will help you integrate Google Calendar API with your appointment booking system.

## Prerequisites

- Google Cloud Console account
- Node.js installed
- Next.js project set up

## Step 1: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

## Step 2: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Configure the OAuth consent screen if prompted
4. Select "Web application" as the application type
5. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`
6. Save and note down:
   - Client ID
   - Client Secret

## Step 3: Install Required Packages

```bash
npm install googleapis
```

## Step 4: Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
GOOGLE_REFRESH_TOKEN=your_refresh_token_here
```

## Step 5: Get Refresh Token

Run this script to get your refresh token:

```javascript
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URI'
);

const scopes = [
  'https://www.googleapis.com/auth/calendar'
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

console.log('Authorize this app by visiting this url:', url);

// After authorization, exchange the code for tokens:
// const { tokens } = await oauth2Client.getToken(code);
// console.log('Refresh Token:', tokens.refresh_token);
```

## Step 6: Update API Route

The API route at `app/api/book-appointment/route.ts` contains commented code for Google Calendar integration. Uncomment and configure it with your credentials.

## Step 7: Test the Integration

1. Start your development server: `npm run dev`
2. Fill out the booking form
3. Check your Google Calendar for the new event
4. Verify that the attendee receives a calendar invite

## Additional Features

### Email Notifications

Consider adding email notifications using:
- [SendGrid](https://sendgrid.com/)
- [Resend](https://resend.com/)
- [Nodemailer](https://nodemailer.com/)

### Time Zone Handling

Use libraries like `date-fns-tz` or `luxon` for proper time zone handling:

```bash
npm install date-fns date-fns-tz
```

### Availability Checking

Implement availability checking to prevent double bookings:

```javascript
const checkAvailability = async (date, time) => {
  const events = await calendar.events.list({
    calendarId: 'primary',
    timeMin: startDateTime,
    timeMax: endDateTime,
    singleEvents: true,
  });
  
  return events.data.items.length === 0;
};
```

## Security Best Practices

1. Never commit `.env.local` to version control
2. Use environment variables for all sensitive data
3. Implement rate limiting on your API routes
4. Validate and sanitize all user inputs
5. Use HTTPS in production
6. Implement CSRF protection

## Troubleshooting

### Common Issues

1. **"Invalid credentials"**: Check your Client ID and Secret
2. **"Insufficient permissions"**: Ensure Calendar API is enabled
3. **"Token expired"**: Refresh tokens should be stored securely
4. **"Time zone mismatch"**: Always specify time zones explicitly

## Resources

- [Google Calendar API Documentation](https://developers.google.com/calendar/api/guides/overview)
- [OAuth 2.0 for Web Server Applications](https://developers.google.com/identity/protocols/oauth2/web-server)
- [googleapis npm package](https://www.npmjs.com/package/googleapis)
