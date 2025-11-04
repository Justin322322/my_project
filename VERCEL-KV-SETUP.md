# Vercel KV Setup Guide

Your CMS now uses Vercel KV (Redis) for storage instead of file system. This works perfectly on Vercel's serverless platform.

## Setup Steps

### 1. Install Vercel KV Package

```bash
npm install @vercel/kv
```

### 2. Create KV Database on Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **KV (Redis)**
6. Choose a name (e.g., "cms-storage")
7. Select a region close to your users
8. Click **Create**

### 3. Connect to Your Project

After creating the database:
1. Vercel will show you environment variables
2. Click **Connect to Project**
3. Select your project
4. The environment variables will be automatically added

The required environment variables are:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`
- `KV_URL`

### 4. Local Development

For local development, create a `.env.local` file:

```env
# Get these from Vercel Dashboard > Storage > Your KV Database > .env.local tab
KV_REST_API_URL="your-kv-url"
KV_REST_API_TOKEN="your-token"
KV_REST_API_READ_ONLY_TOKEN="your-read-only-token"
KV_URL="your-kv-url"
```

**To get these values:**
1. Go to Vercel Dashboard > Storage > Your KV Database
2. Click on the `.env.local` tab
3. Copy all the environment variables
4. Paste them into your `.env.local` file

### 5. Deploy

```bash
git add .
git commit -m "Add Vercel KV storage for CMS"
git push
```

Vercel will automatically deploy with the KV database connected.

## How It Works

- **GET /api/cms** - Reads content from Vercel KV
- **POST /api/cms** - Saves content to Vercel KV
- **First time** - Automatically initializes with default content
- **Persistent** - Data persists across deployments
- **Fast** - Redis is extremely fast (sub-millisecond reads)

## Pricing

- **Free tier**: 30,000 commands per month
- **Pro tier**: 500,000 commands per month
- Your CMS will use ~2 commands per save (well within free tier)

## Fallback

If Vercel KV is not configured, the app will:
1. Try to use KV
2. Fall back to default content if KV fails
3. Show error in console but won't crash

## Testing

After setup, test your CMS:
1. Go to `/admin/editor`
2. Make changes
3. Click Save
4. Refresh the page
5. Changes should persist

## Migration from File-Based

Your existing `cms-data.json` content will be automatically migrated on first load. The system will:
1. Check if KV has content
2. If not, use default content from `lib/cms-content.ts`
3. Save it to KV

## Troubleshooting

**Error: "KV is not configured"**
- Make sure you've created a KV database on Vercel
- Check that environment variables are set
- Redeploy your project

**Changes not saving**
- Check Vercel logs for errors
- Verify KV database is connected to your project
- Check that you're not hitting rate limits

**Local development not working**
- Make sure `.env.local` exists with correct values
- Restart your dev server after adding env variables
- Check that values are copied correctly from Vercel dashboard

## Alternative: Keep File-Based for Local

If you want to use file-based storage locally and KV on Vercel, you can modify `lib/cms-storage.ts` to check the environment:

```typescript
const isProduction = process.env.NODE_ENV === 'production';
const useKV = isProduction || process.env.USE_KV === 'true';
```

This way you can develop locally with files and deploy with KV.
