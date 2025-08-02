import { getServerSession } from "next-auth";
import {
  checkReviewExist,
  createReview,
  getUserData,
  updateReview,
} from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { authSanityClient } from "@/libs/sanity";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("=== Debug User Data API ===");

    const session = await getServerSession(authOptions);
    console.log("Session:", {
      hasSession: !!session,
      hasUser: !!session?.user,
      hasUserId: !!session?.user?.id,
      userId: session?.user?.id,
      userEmail: session?.user?.email,
    });

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "No session found",
        },
        { status: 401 },
      );
    }

    if (!session.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "No user ID in session",
        },
        { status: 401 },
      );
    }

    const userId = session.user.id;
    console.log("Fetching user data for ID:", userId);

    // Try both with and without user. prefix
    const userIdWithPrefix = userId?.startsWith("user.")
      ? userId
      : `user.${userId}`;
    const userIdWithoutPrefix = userId?.startsWith("user.")
      ? userId.substring(5)
      : userId;

    console.log("Trying with prefix:", userIdWithPrefix);
    console.log("Trying without prefix:", userIdWithoutPrefix);

    let userData = null;
    let error = null;

    try {
      userData = await getUserData(userIdWithPrefix);
      console.log("User data with prefix:", userData);
    } catch (err) {
      console.log("Error with prefix, trying without prefix");
      try {
        userData = await getUserData(userIdWithoutPrefix);
        console.log("User data without prefix:", userData);
      } catch (err2) {
        error = err2;
        console.log("Error without prefix:", err2);
      }
    }

    return NextResponse.json({
      success: true,
      session: {
        hasSession: !!session,
        hasUser: !!session?.user,
        hasUserId: !!session?.user?.id,
        userId: session?.user?.id,
        userEmail: session?.user?.email,
      },
      userData: userData,
      error: error ? (error as Error).message : null,
      userIds: {
        original: userId,
        withPrefix: userIdWithPrefix,
        withoutPrefix: userIdWithoutPrefix,
      },
    });
  } catch (error) {
    console.error("Error getting user data in users route:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    console.log("=== POST /api/users - Review submission ===");

    const session = await getServerSession(authOptions);
    console.log("Session check:", {
      hasSession: !!session,
      hasUser: !!session?.user,
      hasUserId: !!session?.user?.id,
      userId: session?.user?.id,
      userEmail: session?.user?.email,
    });

    if (!session) {
      console.log("❌ User not logged in - no session");
      return new NextResponse("Need to be logged in", { status: 401 });
    }
    if (!session.user?.id) {
      console.log("❌ Invalid session - no user ID:", session);
      return new NextResponse("Invalid session - no user ID", { status: 401 });
    }

    const { roomId, reviewText, reviewValue } = await req.json();
    console.log("Review submission data:", { roomId, reviewText, reviewValue });

    if (!roomId || !reviewText || !reviewValue) {
      console.log("Missing required fields");
      return new NextResponse("All fields are required", { status: 400 });
    }

    const userId = session.user.id;
    console.log("User ID:", userId);
    console.log("User ID type:", typeof userId);
    console.log("User ID length:", userId?.length);

    // Clean up user ID - remove 'user.' prefix if present
    const cleanUserId = userId?.startsWith("user.")
      ? userId.substring(5)
      : userId;
    console.log("Clean User ID:", cleanUserId);

    // Validate that the room exists
    try {
      const roomExists = await authSanityClient.fetch(
        "*[_type == 'hotelRoom' && _id == $roomId][0]",
        { roomId },
      );
      console.log("Room exists check:", roomExists);
      if (!roomExists) {
        console.log("Room not found:", roomId);
        return new NextResponse("Room not found", { status: 404 });
      }
    } catch (error) {
      console.error("Error checking room existence:", error);
      return new NextResponse("Error validating room", { status: 500 });
    }

    // Validate that the user exists (try both with and without prefix)
    let workingUserId: string;
    try {
      const userIdWithPrefix = userId?.startsWith("user.")
        ? userId
        : `user.${userId}`;
      const userIdWithoutPrefix = userId?.startsWith("user.")
        ? userId.substring(5)
        : userId;

      console.log("User validation - trying with prefix:", userIdWithPrefix);
      console.log(
        "User validation - trying without prefix:",
        userIdWithoutPrefix,
      );

      let userExists = await authSanityClient.fetch(
        "*[_type == 'user' && _id == $userId][0]",
        { userId: userIdWithPrefix },
      );

      if (!userExists) {
        console.log("User not found with prefix, trying without prefix");
        userExists = await authSanityClient.fetch(
          "*[_type == 'user' && _id == $userId][0]",
          { userId: userIdWithoutPrefix },
        );
      }

      console.log("User exists check:", userExists);
      if (!userExists) {
        console.log("User not found with either format");
        return new NextResponse("User not found", { status: 404 });
      }

      // Use the format that worked for the review operations
      workingUserId = userExists._id;
      console.log("Using working user ID for review:", workingUserId);
    } catch (error) {
      console.error("Error checking user existence:", error);
      return new NextResponse("Error validating user", { status: 500 });
    }

    // Check if the user already left a review for this booking
    // If not we create a review else we update existing review
    const existingReview = await checkReviewExist(workingUserId, roomId);
    console.log("Existing review:", existingReview);

    let data: any;
    if (existingReview) {
      console.log("Updating existing review");
      data = await updateReview({
        reviewId: existingReview._id,
        reviewText,
        userRating: reviewValue,
      });
    } else {
      console.log("Creating new review");
      data = await createReview({
        hotelRoomId: roomId,
        reviewText,
        userRating: reviewValue,
        userId: workingUserId,
      });
    }

    console.log("Review operation successful:", data);
    return NextResponse.json(data, {
      status: 200,
      statusText: "Review has been created successfully",
    });
  } catch (error) {
    console.error("Error in review submission:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(`Unable to create a new review: ${errorMessage}`, {
      status: 500,
    });
  }
}
