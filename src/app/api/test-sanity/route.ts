import { NextResponse } from "next/server";
import sanityClient from "@/libs/sanity";

export async function GET() {
  try {
    // Test basic Sanity connection
    const result = await sanityClient.fetch('*[_type == "hotelRoom"][0...3]');

    return NextResponse.json({
      success: true,
      message: "Sanity connection successful",
      data: result,
      count: Array.isArray(result) ? result.length : 0,
    });
  } catch (error) {
    console.error("Sanity test error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Sanity connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
