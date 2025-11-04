import type { CMSContent } from "./cms-content";
import { defaultContent } from "./cms-content";

const CMS_KEY = "cms-content";

// Check if we're in a Vercel environment with KV configured
const hasVercelKV = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;
const hasRedisURL = process.env.REDIS_URL;
const hasStorage = hasVercelKV || hasRedisURL;

/**
 * Get CMS content from storage (Vercel KV or Redis)
 * Falls back to default content if not found
 */
export async function getCMSContent(): Promise<CMSContent> {
  // If no storage is configured, return default content
  if (!hasStorage) {
    console.log("No storage configured, using default content");
    return defaultContent;
  }

  try {
    // Use Vercel KV if available
    if (hasVercelKV) {
      const { kv } = await import("@vercel/kv");
      const content = await kv.get<CMSContent>(CMS_KEY);
      
      if (content) {
        console.log("Content loaded from Vercel KV");
        return content;
      }
      
      console.log("Initializing Vercel KV with default content");
      await kv.set(CMS_KEY, defaultContent);
      return defaultContent;
    }
    
    // Use Redis Cloud if REDIS_URL is provided
    if (hasRedisURL) {
      const { Redis } = await import("ioredis");
      const redis = new Redis(process.env.REDIS_URL!);
      
      const data = await redis.get(CMS_KEY);
      
      if (data) {
        console.log("Content loaded from Redis");
        await redis.quit();
        return JSON.parse(data);
      }
      
      console.log("Initializing Redis with default content");
      await redis.set(CMS_KEY, JSON.stringify(defaultContent));
      await redis.quit();
      return defaultContent;
    }
    
    return defaultContent;
  } catch (error) {
    console.error("Error reading from storage:", error);
    return defaultContent;
  }
}

/**
 * Save CMS content to storage (Vercel KV or Redis)
 */
export async function saveCMSContent(content: CMSContent): Promise<boolean> {
  // If storage is not configured, log warning
  if (!hasStorage) {
    console.warn("Storage not configured - changes will not persist!");
    console.warn("Please set up Vercel KV or Redis");
    return false;
  }

  try {
    // Use Vercel KV if available
    if (hasVercelKV) {
      const { kv } = await import("@vercel/kv");
      await kv.set(CMS_KEY, content);
      console.log("Content saved to Vercel KV successfully");
      return true;
    }
    
    // Use Redis Cloud if REDIS_URL is provided
    if (hasRedisURL) {
      const { Redis } = await import("ioredis");
      const redis = new Redis(process.env.REDIS_URL!);
      await redis.set(CMS_KEY, JSON.stringify(content));
      await redis.quit();
      console.log("Content saved to Redis successfully");
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error saving to storage:", error);
    return false;
  }
}

/**
 * Reset CMS content to default
 */
export async function resetCMSContent(): Promise<boolean> {
  if (!hasStorage) {
    console.warn("Storage not configured");
    return false;
  }

  try {
    // Use Vercel KV if available
    if (hasVercelKV) {
      const { kv } = await import("@vercel/kv");
      await kv.set(CMS_KEY, defaultContent);
      console.log("Content reset to default in Vercel KV");
      return true;
    }
    
    // Use Redis Cloud if REDIS_URL is provided
    if (hasRedisURL) {
      const { Redis } = await import("ioredis");
      const redis = new Redis(process.env.REDIS_URL!);
      await redis.set(CMS_KEY, JSON.stringify(defaultContent));
      await redis.quit();
      console.log("Content reset to default in Redis");
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error resetting storage:", error);
    return false;
  }
}
