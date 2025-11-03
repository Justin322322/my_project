# Complete Setup Guide

This comprehensive guide covers all setup and configuration for the appointment booking system.

## 📋 Overview

You need these 4 credentials from Google Cloud Console:
1. **GOOGLE_CLIENT_ID** - From OAuth 2.0 credentials
2. **GOOGLE_CLIENT_SECRET** - From OAuth 2.0 credentials
3. **GOOGLE_REDIRECT_URI** - Your callback URL (localhost for dev, your domain for prod)
4. **GOOGLE_REFRESH_TOKEN** - Generated once using the script below

### 🔗 Quick Links to Google Cloud Console

**Start here:** [Google Cloud Console Dashboard](https://console.cloud.google.com/)

Direct links (after creating your project):
- 📚 [Enable Google Calendar API](https://console.cloud.google.com/apis/library/calendar-json.googleapis.com)
- ⚙️ [OAuth Consent Screen Configuration](https://console.cloud.google.com/apis/credentials/consent)
- 🔑 [Create OAuth Credentials](https://console.cloud.google.com/apis/credentials)
- 📋 [View All Credentials](https://console.cloud.google.com/apis/credentials)

## Prerequisites

- Google Cloud Console account (free at [console.cloud.google.com](https://console.cloud.google.com/))
- Node.js installed
- Next.js project set up
- Basic terminal/command line knowledge

---

## Step 1: Set Up Google Cloud Project

### 1.1 Create or Select a Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. **Create a new project:**
   - Click on the project dropdown at the top (next to "Google Cloud")
   - Click "New Project"
   - Enter a project name (e.g., "Appointment Booking")
   - Click "Create"
4. **OR select an existing project** from the dropdown

### 1.2 Enable Google Calendar API

**Quick link:** [Enable Google Calendar API](https://console.cloud.google.com/apis/library/calendar-json.googleapis.com)

1. In the left sidebar, click **"APIs & Services"** > **"Library"**
2. Search for **"Google Calendar API"**
3. Click on **"Google Calendar API"** from the results
4. Click the **"Enable"** button
5. Wait a few seconds for the API to be enabled

**You should see:** "API enabled" message or a green checkmark

---

## Step 2: Create OAuth 2.0 Credentials

### 2.1 Configure OAuth Consent Screen

**First time setup - You need to configure this before creating credentials:**

**Quick link:** [OAuth Consent Screen](https://console.cloud.google.com/apis/credentials/consent)

1. Go to **"APIs & Services"** > **"OAuth consent screen"** (in the left sidebar)
2. Select **"External"** user type and click **"Create"**
3. Fill in the required information:
   - **App name:** Your app name (e.g., "Appointment Booking")
   - **User support email:** Your email
   - **Developer contact email:** Your email
4. Click **"Save and Continue"**
5. On "Scopes" page, click **"Add or Remove Scopes"**
6. Search and add: `.../auth/calendar` (Google Calendar API)
7. Click **"Update"** then **"Save and Continue"**
8. Add test users (your own email) if needed, then **"Save and Continue"**
9. Review and **"Back to Dashboard"**

### 2.2 Create OAuth 2.0 Client Credentials

**Quick link:** [Create OAuth Credentials](https://console.cloud.google.com/apis/credentials)

1. Go to **"APIs & Services"** > **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** button at the top
3. Select **"OAuth client ID"**

   **If you see a warning about OAuth consent screen, complete Step 2.1 first.**

4. Select **"Web application"** as the application type
5. Fill in the details:
   - **Name:** "Appointment Booking Web Client" (or any name you prefer)
   
   - **Authorized JavaScript origins:** (optional for this setup)
     - Leave empty
   
   - **Authorized redirect URIs:** ⚠️ **IMPORTANT** - Add these:
     ```
     http://localhost:3000/api/auth/callback/google
     https://yourdomain.com/api/auth/callback/google
     ```
     - Click **"+ ADD URI"** for each URL
     - Replace `yourdomain.com` with your actual domain (e.g., `myapp.vercel.app`)

6. Click **"CREATE"**

7. **SAVE YOUR CREDENTIALS** ⚠️ **You'll only see this once!**
   - A popup will appear with:
     - **Your Client ID** - Copy this!
     - **Your Client Secret** - Copy this!
   - Click **"OK"**

### 2.3 Find Your Credentials Later

**Quick link:** [View All Credentials](https://console.cloud.google.com/apis/credentials)

If you didn't save them, you can find them again:
1. Go to **"APIs & Services"** > **"Credentials"**
2. Look for your OAuth 2.0 Client ID under "OAuth 2.0 Client IDs"
3. Click the pencil icon to edit
4. Your **Client ID** is visible
5. Your **Client Secret** is hidden - click the eye icon to reveal it

---

## Step 3: Install Required Packages

```bash
npm install googleapis
```

---

## Step 4: Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
GOOGLE_REFRESH_TOKEN=your_refresh_token_here
TIMEZONE=America/New_York
```

**Important Notes:**
- **Never commit `.env.local` to version control** (it's already in `.gitignore`)
- The form currently collects: `name`, `email`, `date`, `time`, and optional `message`
- Phone field is collected but not currently used for calendar invites
- Appointments are created with the client's email as an attendee

---

## Step 5: Get Refresh Token

The refresh token allows your app to create calendar events without requiring user login each time.

### 5.1 Create a Get-Refresh-Token Script

Create a new file `get-refresh-token.js` in your project root:

```javascript
const { google } = require('googleapis');

// Replace these with your actual credentials from Step 2
const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE';
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback/google';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const scopes = [
  'https://www.googleapis.com/auth/calendar'
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent' // This ensures we get a refresh token
});

console.log('\n📌 Step 1: Visit this URL to authorize:');
console.log(url);
console.log('\n📌 Step 2: After authorization, you\'ll be redirected to a localhost URL');
console.log('📌 Step 3: Copy the "code" parameter from the redirected URL');
console.log('\n📌 Step 4: Paste the code here and run this script again with the code');
console.log('Example redirected URL: http://localhost:3000/api/auth/callback/google?code=XXXXX');
```

### 5.2 Get the Authorization Code

1. Replace `YOUR_CLIENT_ID_HERE`, `YOUR_CLIENT_SECRET_HERE` with your actual credentials
2. Run the script: `node get-refresh-token.js`
3. Copy the URL that appears
4. Open the URL in your browser
5. Sign in and grant permissions
6. You'll be redirected to a localhost URL that looks like:
   ```
   http://localhost:3000/api/auth/callback/google?code=4/0AX4XfWjXXXXXXXXXXXXXXXXXX
   ```
7. **Copy the "code" value** from the URL (the part after `code=`)

### 5.3 Exchange Code for Refresh Token

Update your `get-refresh-token.js` file with this code to exchange the authorization code:

```javascript
const { google } = require('googleapis');

const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE';
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback/google';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Paste your authorization code here
const authCode = 'YOUR_AUTHORIZATION_CODE_HERE';

async function getRefreshToken() {
  try {
    const { tokens } = await oauth2Client.getToken(authCode);
    console.log('\n✅ SUCCESS! Copy these tokens:');
    console.log('\nAccess Token:', tokens.access_token);
    console.log('\n🔄 REFRESH TOKEN (save this to .env.local):');
    console.log(tokens.refresh_token);
  } catch (error) {
    console.error('❌ Error getting refresh token:', error.message);
  }
}

getRefreshToken();
```

1. Replace `YOUR_AUTHORIZATION_CODE_HERE` with the code you copied from Step 5.2
2. Run: `node get-refresh-token.js`
3. **Copy the Refresh Token** - This is what you'll use in your `.env.local` file

**Alternative:** For testing, you can skip this step and generate a refresh token each time, but the recommended approach is to get a refresh token once and reuse it.

---

## Step 6: Update API Route

The API route at `app/api/book-appointment/route.ts` contains commented code for Google Calendar integration. Uncomment and configure it with your credentials.

---

## Step 7: Test the Integration

1. Start your development server: `npm run dev`
2. Fill out the booking form
3. Check your Google Calendar for the new event
4. Verify that the attendee receives a calendar invite

---

## 🚀 Deployment on Vercel

When deploying to Vercel (e.g., `myapp.vercel.app`):

### 1. Configure Google Cloud Console

Add your production URL to authorized redirect URIs:
- In Google Cloud Console, go to **APIs & Services** > **Credentials**
- Click your OAuth 2.0 Client ID
- Add: `https://myapp.vercel.app/api/auth/callback/google`

### 2. Configure Vercel Environment Variables

In Vercel Dashboard, add these environment variables:
- `GOOGLE_CLIENT_ID` = your_client_id
- `GOOGLE_CLIENT_SECRET` = your_client_secret
- `GOOGLE_REDIRECT_URI` = https://myapp.vercel.app/api/auth/callback/google
- `GOOGLE_REFRESH_TOKEN` = your_refresh_token
- `TIMEZONE` = America/New_York (optional)

### 3. Deploy

```bash
vercel
```

Or use the Vercel dashboard to deploy. After adding the environment variables, trigger a new deployment.

---

## 🔐 Security Best Practices

1. Never commit `.env.local` to version control
2. Use environment variables for all sensitive data
3. Implement rate limiting on your API routes
4. Validate and sanitize all user inputs
5. Use HTTPS in production
6. Implement CSRF protection

---

## 🔧 Troubleshooting

### Common Issues

1. **"Invalid credentials"**: Check your Client ID and Secret
2. **"Insufficient permissions"**: Ensure Calendar API is enabled
3. **"Token expired"**: Refresh tokens should be stored securely
4. **"Time zone mismatch"**: Always specify time zones explicitly

---

## 📊 Quick Reference

| Credential | Where to Get It | Location in Google Cloud Console |
|------------|----------------|----------------------------------|
| **CLIENT_ID** | OAuth 2.0 Credentials | APIs & Services → Credentials → Your OAuth Client → Client ID |
| **CLIENT_SECRET** | OAuth 2.0 Credentials | APIs & Services → Credentials → Your OAuth Client → Client Secret (click eye icon) |
| **REDIRECT_URI** | You configure this | Development: `http://localhost:3000/api/auth/callback/google`<br>Production: `https://yourdomain.com/api/auth/callback/google` |
| **REFRESH_TOKEN** | Generated via script | Run Step 5 script to generate |

---

## 📚 Additional Resources

- [Google Calendar API Documentation](https://developers.google.com/calendar/api/guides/overview)
- [OAuth 2.0 for Web Server Applications](https://developers.google.com/identity/protocols/oauth2/web-server)
- [googleapis npm package](https://www.npmjs.com/package/googleapis)

---

## 📱 Additional Features

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

---

## ✅ Current Implementation Status

- ✅ Form validation and submission
- ✅ API endpoint ready (`app/api/book-appointment/route.ts`)
- ⚠️ Google Calendar integration is commented out (needs to be uncommented)
- ⚠️ `googleapis` package needs to be installed (Step 3)

## 🎯 Next Steps to Activate

1. ✅ Complete Steps 1-7 above
2. Install the googleapis package: `npm install googleapis`
3. Create `.env.local` with your credentials
4. Uncomment the Google Calendar code in `app/api/book-appointment/route.ts`
5. Test the booking flow

