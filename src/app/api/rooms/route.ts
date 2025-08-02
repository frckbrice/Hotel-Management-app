import { NextResponse } from "next/server";
import { getRooms } from "@/libs/apis";

export async function GET() {
  try {
    const rooms = await getRooms();

    return NextResponse.json({
      success: true,
      data: rooms,
      count: rooms.length,
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch rooms",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
