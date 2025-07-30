import { getServerSession } from "next-auth";
import { getUserBookings } from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            console.log("User not logged in");
            return new NextResponse("Need to be logged in", { status: 401 });
        }

        if (!session.user?.id) {
            console.log("No user ID in session:", session);
            return new NextResponse("Invalid session - no user ID", { status: 401 });
        }

        const userId = session.user.id;
        console.log("UserBookings API - User ID:", userId);

        // Clean up user ID - remove 'user.' prefix if present (Google OAuth issue)
        const cleanUserId = userId?.startsWith('user.') ? userId.substring(5) : userId;
        console.log("UserBookings API - Clean User ID:", cleanUserId);

        const bookings = await getUserBookings(cleanUserId);
        console.log("UserBookings API - Bookings found:", bookings?.length || 0);

        return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return new NextResponse(`Unable to fetch user bookings: ${errorMessage}`, { status: 500 });
    }
} 