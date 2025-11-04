import { NextResponse } from "next/server";
import { getCMSContent, saveCMSContent } from "@/lib/cms-storage";

export async function GET() {
  try {
    const content = await getCMSContent();
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load content" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const content = await request.json();
    const success = await saveCMSContent(content);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to save content" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 }
    );
  }
}
