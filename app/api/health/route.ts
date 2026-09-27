import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const isDbConnected = db.connection.readyState === 1;

    return NextResponse.json({
      success: true,
      data: {
        status: "healthy",
        uptime: process.uptime(),
        database: isDbConnected ? "connected" : "connecting",
        timestamp: new Date().toISOString(),
      },
      message: "Jain Dhaba API is running smoothly",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "HEALTH_CHECK_FAILED",
          message: error.message || "Failed to connect to backend services",
        },
      },
      { status: 500 }
    );
  }
}
