import { kv } from "@vercel/kv";
import type { CMSContent } from "./cms-content";
import { defaultContent } from "./cms-content";

const CMS_KEY = "cms-content";

/**
 * Get CMS content from Vercel KV storage
 * Falls back to default content if not found
 */
export async function getCMSContent(): Promise<CMSContent> {
  try {
    // Try to get from Vercel KV
    const content = await kv.get<CMSContent>(CMS_KEY);
    
    if (content) {
      return content;
    }
    
    // If no content in KV, initialize with default
    await kv.set(CMS_KEY, defaultContent);
    return defaultContent;
  } catch (error) {
    console.error("Error reading from KV:", error);
    // Fallback to default content if KV fails
    return defaultContent;
  }
}

/**
 * Save CMS content to Vercel KV storage
 */
export async function saveCMSContent(content: CMSContent): Promise<boolean> {
  try {
    await kv.set(CMS_KEY, content);
    return true;
  } catch (error) {
    console.error("Error saving to KV:", error);
    return false;
  }
}

/**
 * Reset CMS content to default
 */
export async function resetCMSContent(): Promise<boolean> {
  try {
    await kv.set(CMS_KEY, defaultContent);
    return true;
  } catch (error) {
    console.error("Error resetting KV:", error);
    return false;
  }
}
