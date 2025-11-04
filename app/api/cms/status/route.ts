import { NextResponse } from "next/server";

export async function GET() {
  const hasKV = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  
  const status = {
    kvConfigured: hasKV,
    environment: process.env.NODE_ENV,
    envVars: {
      KV_REST_API_URL: !!process.env.KV_REST_API_URL,
      KV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,
      KV_REST_API_READ_ONLY_TOKEN: !!process.env.KV_REST_API_READ_ONLY_TOKEN,
      KV_URL: !!process.env.KV_URL,
    },
    message: hasKV 
      ? "✅ Vercel KV is configured correctly" 
      : "❌ Vercel KV is NOT configured. Please set up KV in Vercel Dashboard.",
    instructions: hasKV 
      ? "Your CMS should work correctly." 
      : "Go to: Vercel Dashboard > Storage > Create Database > KV, then connect to your project."
  };

  return NextResponse.json(status);
}
