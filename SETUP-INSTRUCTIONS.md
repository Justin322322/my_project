# Quick Setup Instructions

## Step 1: Install Vercel KV Package

Run this command in your terminal:

```bash
npm install @vercel/kv
```

## Step 2: Set Up Vercel KV Database

### On Vercel Dashboard:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Click **Storage** tab
4. Click **Create Database**
5. Select **KV (Redis)**
6. Name it: `cms-storage`
7. Click **Create**
8. Click **Connect to Project** and select your project

### For Local Development:

1. In Vercel Dashboard, go to your KV database
2. Click the `.env.local` tab
3. Copy all the environment variables
4. Create a `.env.local` file in your project root
5. Paste the variables

Example `.env.local`:
```env
KV_REST_API_URL="https://your-kv-url.kv.vercel-storage.com"
KV_REST_API_TOKEN="your-token-here"
KV_REST_API_READ_ONLY_TOKEN="your-read-only-token"
KV_URL="redis://your-url"
```

## Step 3: Test Locally

```bash
npm run dev
```

Go to http://localhost:3000/admin/editor and test saving changes.

## Step 4: Deploy

```bash
git add .
git commit -m "Add Vercel KV storage"
git push
```

## That's It!

Your CMS now works on Vercel with persistent storage. All edits will be saved to Redis and persist across deployments.

## Pricing

- **Free tier**: 30,000 commands/month (more than enough for a CMS)
- Your usage: ~2 commands per save

## Need Help?

See `VERCEL-KV-SETUP.md` for detailed troubleshooting and advanced options.
