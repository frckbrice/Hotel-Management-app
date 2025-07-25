import { getServerSession } from "next-auth";
import {
  checkReviewExist,
  createReview,
  getUserData,
  updateReview,
} from "@/libs/apis";
import { authOptions } from "@/libs/auth";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  //*get logged in user credentials from session
  const session = await getServerSession(authOptions);

  console.log("session: " + (await session));

  if (!session) {
    console.log("user not logged in");
    return new NextResponse("Authentication required!!", {
      status: 500,
    });
  }

  const userId = session.user.id;

  try {
    //* get user from sanity backend
    const data = await getUserData(userId);
    // console.log("api user data: ", data);
    return NextResponse.json(data, { status: 200, statusText: " Successfull" });
  } catch (err) {
    console.log("error getting user data: ", err);
    return new NextResponse("Unable to get user data ", { status: 400 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session)
    return new NextResponse("Need to be logged in", { status: 500 });

  const { roomId, reviewText, reviewValue } = await req.json();

  if (!roomId || !reviewText || !reviewValue)
    return new NextResponse("All the fieds are required", { status: 400 });

  const userId = session.user.id;

  try {
    //* check if the user already left a review for this booking
    //* if not we create a review else we update existing review
    const existingUser = await checkReviewExist(userId, roomId);

    console.log("existingUser ", existingUser);
    let data: any;
    if (existingUser)
      data = await updateReview({
        reviewId: existingUser._id,
        reviewText,
        userRating: reviewValue,
      });
    else
      data = await createReview({
        hotelRoomId: roomId,
        reviewText,
        userRating: reviewValue,
        userId,
      });

    return NextResponse.json(data, {
      status: 200,
      statusText: "Review has been created successfully",
    });
  } catch (error) {
    console.log("error updating the rating: ", error);
    return new NextResponse("Unable to create a new review", { status: 500 });
  }
}
