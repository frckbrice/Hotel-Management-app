import LoadingSpinner from '@/app/(web)/loading';
import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import { Review } from '../models/review';
import Rating from '../Rating/Rating';

type Props = {
  roomId: string;
};

const RoomReview = ({ roomId }: Props) => {
  const fetchroomReview = async () => {
    const { data } = await axios.get<Review[]>(`/api/room-reviews/${roomId}`);

    return data;
  };

  const {
    data: roomReviews,
    isLoading,
    error,
  } = useSWR('/api/room-reviews', fetchroomReview);

  if (error) throw new Error('Cannot fetch reviews data');
  if (typeof roomReviews === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');
  if (!roomReviews) return <LoadingSpinner />;

  // console.log(roomReviews);

  return (
    <div>
      {roomReviews &&
        roomReviews?.map((review: Review) => (
          <div
            key={review._id}
            className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-green-200 dark:border-green-700'
          >
            <div className='font-semibold mb-2 flex'>
              <p className='text-gray-800 dark:text-white'>
                {review.user.name}
              </p>
              <div className='ml-4 flex items-center text-green-600 dark:text-green-400 text-lg'>
                <Rating rating={review.userRating} />
              </div>
            </div>

            <p className='text-gray-700 dark:text-gray-300 text-justify'>
              {review.text}
            </p>
          </div>
        ))}
    </div>
  );
};

export default RoomReview;
