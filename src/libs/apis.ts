import { CreateBookingDto, Room } from '@/components/models/room';
import sanityClient from './sanity';
import * as queries from './sanityQuery';
import axios from 'axios';
import hotelRoom from '../../schemas/hotelRoom';
import { Booking } from '@/components/models/booking';
import {
  CreateReviewDto,
  Review,
  UpdateReviewDto,
} from '@/components/models/review';

export async function getFeaturedRoom() {
  const result = await sanityClient.fetch<Room>(
    queries.getFeaturedRoomQuery,
    {},
    { cache: 'no-cache' }
    // { next: { revalidate: 1800 } } // usefull in production
  );

  return result;
}

export const getRooms = async (): Promise<Room[]> => {
  const result = await sanityClient.fetch<Room[]>(
    queries.getRoomsQuery,
    {},
    { cache: 'no-cache' }
  );
  return result;
};

export async function getRoom(slug: string) {
  const result = await sanityClient.fetch<Room>(
    queries.getRoom,
    { slug },
    { cache: 'no-cache' }
  );
  // console.log("room from api file: ", result);
  return result;
}

export const createBooking = async ({
  adults,
  checkinDate,
  checkoutDate,
  children,
  discount,
  hotelRoom,
  numberOfDays,
  totalPrice,
  user,
}: CreateBookingDto) => {
  // Ensure user ID has the 'user.' prefix for Sanity references
  const userIdWithPrefix = user?.startsWith('user.') ? user : `user.${user}`;

  console.log('CreateBooking - Original User ID:', user);
  console.log('CreateBooking - User ID with prefix:', userIdWithPrefix);
  console.log('CreateBooking - Hotel Room ID:', hotelRoom);

  const mutation = {
    mutations: [
      {
        create: {
          _type: 'booking',
          user: { _type: 'reference', _ref: userIdWithPrefix }, // foreign key with prefix
          hotelRoom: { _type: 'reference', _ref: hotelRoom }, //foreign key
          checkinDate,
          checkoutDate,
          numberOfDays,
          adults,
          children,
          totalPrice,
          discount,
        },
      },
    ],
  };

  // Use write token if available, otherwise fall back to studio token
  const token =
    process.env.SANITY_WRITE_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_STUDIO_TOKEN;

  console.log('CreateBooking - Mutation:', JSON.stringify(mutation, null, 2));
  console.log('CreateBooking - Token available:', !!token);
  console.log(
    'CreateBooking - Project ID:',
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  );
  console.log(
    'CreateBooking - Dataset:',
    process.env.NEXT_PUBLIC_SANITY_DATASET
  );

  try {
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('CreateBooking - Success:', data);
    return data;
  } catch (error: any) {
    console.error('CreateBooking - Error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};

export const updateHotelRoom = async (hotelRoomId: string) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: hotelRoomId,
          set: {
            isBooked: true,
          },
        },
      },
    ],
  };

  // Use write token if available, otherwise fall back to studio token
  const token =
    process.env.SANITY_WRITE_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_STUDIO_TOKEN;

  console.log('UpdateHotelRoom - Mutation:', JSON.stringify(mutation, null, 2));
  console.log('UpdateHotelRoom - Token available:', !!token);
  console.log('UpdateHotelRoom - Hotel Room ID:', hotelRoomId);

  try {
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('UpdateHotelRoom - Success:', data);
    return data;
  } catch (error: any) {
    console.error('UpdateHotelRoom - Error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};

export const getUserBookings = async (userId: string) => {
  console.log('GetUserBookings - Original User ID:', userId);

  // Try both with and without 'user.' prefix since the database has mixed formats
  const userIdWithPrefix = userId?.startsWith('user.')
    ? userId
    : `user.${userId}`;
  const userIdWithoutPrefix = userId?.startsWith('user.')
    ? userId.substring(5)
    : userId;

  console.log('GetUserBookings - User ID with prefix:', userIdWithPrefix);
  console.log('GetUserBookings - User ID without prefix:', userIdWithoutPrefix);

  // First try with the prefix (as stored in the database)
  let result = await sanityClient.fetch<Booking[]>(
    queries.getUserBookingsQuery,
    {
      userId: userIdWithPrefix,
    },
    { cache: 'no-cache' }
  );

  console.log('GetUserBookings - Result with prefix:', result?.length || 0);

  // If no results, try without the prefix
  if (!result || result.length === 0) {
    result = await sanityClient.fetch<Booking[]>(
      queries.getUserBookingsQuery,
      {
        userId: userIdWithoutPrefix,
      },
      { cache: 'no-cache' }
    );
    console.log(
      'GetUserBookings - Result without prefix:',
      result?.length || 0
    );
  }

  console.log('GetUserBookings - Final Result:', result);
  console.log('GetUserBookings - Number of bookings:', result?.length || 0);

  return result;
};

export const getUserData = async (userId: string) => {
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    {
      cache: 'no-cache',
    }
  );

  return result;
};

export const checkReviewExist = async (
  userId: string,
  hotelRoomId: string
): Promise<null | { _id: string }> => {
  const query = `*[_type == 'review' && user._ref == $userId && hotelRoom._ref == $hotelRoomId][0]{
    _id
  }`;

  const params = {
    userId,
    hotelRoomId,
  };

  const result = await sanityClient.fetch(query, params);

  return result ? result : null;
};

export const updateReview = async ({
  reviewId,
  reviewText,
  userRating,
}: UpdateReviewDto) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: reviewId,
          set: {
            text: reviewText,
            userRating,
          },
        },
      },
    ],
  };

  // Use write token if available, otherwise fall back to studio token
  const token =
    process.env.SANITY_WRITE_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_STUDIO_TOKEN;

  console.log('Update Review - Mutation:', JSON.stringify(mutation, null, 2));
  console.log('Update Review - Token available:', !!token);
  console.log(
    'Update Review - Project ID:',
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  );
  console.log(
    'Update Review - Dataset:',
    process.env.NEXT_PUBLIC_SANITY_DATASET
  );

  try {
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Update Review - Success:', data);
    return data;
  } catch (error: any) {
    console.error('Update Review - Error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};

export const createReview = async ({
  hotelRoomId,
  reviewText,
  userId,
  userRating,
}: CreateReviewDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'review',
          user: {
            _type: 'reference',
            _ref: userId,
          },
          hotelRoom: {
            _type: 'reference',
            _ref: hotelRoomId,
          },
          userRating,
          text: reviewText,
        },
      },
    ],
  };

  // Use write token if available, otherwise fall back to studio token
  const token =
    process.env.SANITY_WRITE_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_STUDIO_TOKEN;

  console.log('Create Review - Mutation:', JSON.stringify(mutation, null, 2));
  console.log('Create Review - Token available:', !!token);
  console.log(
    'Create Review - Project ID:',
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  );
  console.log(
    'Create Review - Dataset:',
    process.env.NEXT_PUBLIC_SANITY_DATASET
  );
  console.log('Create Review - Input data:', {
    hotelRoomId,
    reviewText,
    userId,
    userRating,
  });

  try {
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Create Review - Success:', data);
    return data;
  } catch (error: any) {
    console.error('Create Review - Error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};

export async function getRoomReviews(roomId: string) {
  const result = await sanityClient.fetch<Review[]>(
    queries.getRoomReviewsQuery,
    {
      roomId,
    },
    { cache: 'no-cache' }
  );
  return result;
}
