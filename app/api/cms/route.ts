import { NextResponse } from "next/server";
import { getCMSContent, saveCMSContent } from "@/lib/cms-storage";

export async function GET() {
  try {
    const content = await getCMSContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error("GET /api/cms error:", error);
    return NextResponse.json(
      { error: "Failed to load content", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const content = await request.json();
    console.log("Attempting to save CMS content...");
    
    const success = await saveCMSContent(content);
    
    if (success) {
      console.log("CMS content saved successfully");
      return NextResponse.json({ success: true, message: "Content saved successfully" });
    } else {
      console.error("Failed to save CMS content");
      return NextResponse.json(
        { 
          error: "Failed to save content", 
          message: "KV might not be configured. Check Vercel dashboard.",
          hint: "Go to Vercel Dashboard > Storage > Create KV Database"
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("POST /api/cms error:", error);
    return NextResponse.json(
      { 
        error: "Failed to save content", 
        details: error instanceof Error ? error.message : String(error),
        hint: "Check Vercel logs for more details"
      },
      { status: 500 }
    );
  }
}
