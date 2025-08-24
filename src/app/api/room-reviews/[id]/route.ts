import { getRoomReviews } from "@/libs/apis";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  try {
    const { id: roomId } = await params;

    if (!roomId) {
      return new NextResponse("Room ID is required", { status: 400 });
    }

    const roomReviews = await getRoomReviews(roomId);

    return NextResponse.json(roomReviews, {
      status: 200,
      statusText: "success",
    });
  } catch (error) {
    console.error("Error fetching review data:", error);
    return new NextResponse("Error fetching review data", { status: 500 });
  }
}
