# CMS Not Saving - Troubleshooting Guide

## Quick Check

Visit this URL on your deployed site:
```
https://your-site.vercel.app/api/cms/status
```

This will tell you if Vercel KV is configured correctly.

## Common Issues

### 1. KV Database Not Created

**Symptom:** Changes don't save, status shows "KV is NOT configured"

**Solution:**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Click **Storage** tab
4. Click **Create Database**
5. Select **KV (Redis)**
6. Click **Create**
7. Click **Connect to Project** and select your project
8. Redeploy your site (or wait for auto-deploy)

### 2. KV Not Connected to Project

**Symptom:** KV exists but status shows not configured

**Solution:**
1. Go to Vercel Dashboard > Storage
2. Click on your KV database
3. Go to **Settings** tab
4. Under **Connected Projects**, make sure your project is listed
5. If not, click **Connect Project**
6. Redeploy

### 3. Environment Variables Not Set

**Symptom:** Status shows some env vars are false

**Solution:**
1. Go to Vercel Dashboard > Your Project > Settings > Environment Variables
2. Make sure these exist:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
   - `KV_URL`
3. If missing, go to Storage > Your KV > Settings and copy them
4. Add them manually to your project
5. Redeploy

### 4. Need to Redeploy

**Symptom:** Just connected KV but still not working

**Solution:**
After connecting KV, you MUST redeploy:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

Or in Vercel Dashboard:
- Go to Deployments
- Click the three dots on latest deployment
- Click "Redeploy"

## Check Vercel Logs

1. Go to Vercel Dashboard > Your Project > Deployments
2. Click on the latest deployment
3. Click **Functions** tab
4. Look for `/api/cms` logs
5. Check for errors like:
   - "KV not configured"
   - "Error saving to KV"
   - Connection errors

## Test Locally

To test locally with KV:

1. Get your KV credentials from Vercel Dashboard > Storage > Your KV > .env.local tab
2. Create `.env.local` file:
```env
KV_REST_API_URL="your-url"
KV_REST_API_TOKEN="your-token"
KV_REST_API_READ_ONLY_TOKEN="your-read-only-token"
KV_URL="your-kv-url"
```
3. Restart dev server: `npm run dev`
4. Test at http://localhost:3000/api/cms/status

## Still Not Working?

If you've tried everything above:

1. Check the status endpoint: `/api/cms/status`
2. Check Vercel function logs
3. Try creating a new KV database
4. Make sure you're on a Vercel plan that supports KV (free tier is fine)

## Alternative: Use File-Based Storage Temporarily

If you need to test without KV, I can create a hybrid version that:
- Uses KV in production (when available)
- Falls back to file system in development
- Shows a warning when KV is not configured

Let me know if you need this!
