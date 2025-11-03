import { NextRequest, NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limit: e.g. max 5 requests per 10 minutes per IP
    const ip = getClientIp(request.headers);
    const rl = rateLimit(ip, { windowMs: 10 * 60 * 1000, max: 5 });
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "RateLimit-Limit": "5",
            "RateLimit-Remaining": String(rl.remaining),
            "RateLimit-Reset": String(Math.ceil(rl.resetAt / 1000)),
          },
        }
      );
    }

    const body = await request.json();
    const { name, email, phone, date, time, message } = body;

    // Validate required fields
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Here you would integrate with Google Calendar API
    // For now, we'll simulate the process
    
    // Example Google Calendar API integration:
    /*
    const { google } = require('googleapis');
    const calendar = google.calendar('v3');
    
    // Set up OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });
    
    // Create event
    const event = {
      summary: `Appointment with ${name}`,
      description: message || 'No additional notes',
      start: {
        dateTime: `${date}T${time}:00`,
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: `${date}T${time}:00`,
        timeZone: 'America/New_York',
      },
      attendees: [
        { email: email }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };
    
    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      resource: event,
      sendUpdates: 'all',
    });
    */

    // Simulate successful booking
    const appointmentData = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      phone,
      date,
      time,
      message,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    // Here you would also send confirmation email
    // using services like SendGrid, Resend, or Nodemailer

    const res = NextResponse.json(
      {
        success: true,
        message: "Appointment booked successfully",
        appointment: appointmentData,
      },
      {
        status: 200,
      }
    );
    res.headers.set("RateLimit-Limit", "5");
    res.headers.set("RateLimit-Remaining", String(rl.remaining));
    res.headers.set("RateLimit-Reset", String(Math.ceil(rl.resetAt / 1000)));
    return res;
  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json(
      { error: "Failed to book appointment" },
      { status: 500 }
    );
  }
}
