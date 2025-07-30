import React, { Dispatch, FC, SetStateAction } from 'react';
import { Booking } from '../models/booking';
import { useRouter } from 'next/navigation';

type Props = {
  bookingDetails: Booking[];
  setRoomId: Dispatch<SetStateAction<string | null>>;
  toggleRatingModal: () => void;
};

const Table: FC<Props> = ({ bookingDetails, setRoomId, toggleRatingModal }) => {
  const router = useRouter();

  return (
    <div className='overflow-auto max-w-[340px] rounded-lg mx-auto md:max-w-full shadow-lg sm:rounded-lg bg-white dark:bg-gray-800'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700'>
          <tr>
            <th className=' px-6 py-3'>Room Name</th>
            <th className=' px-6 py-3'>Unit Price</th>
            <th className=' px-6 py-3'>Price </th>
            <th className=' px-6 py-3'>Discount</th>
            <th className=' px-6 py-3'>No. days booked</th>
            <th className=' px-6 py-3'>No. days left</th>
            <th className=' px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {bookingDetails && bookingDetails.length > 0 ? (
            bookingDetails.map(booking => (
              <tr
                key={booking._id}
                className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              >
                <th
                  onClick={() =>
                    router.push(`/rooms/${booking.hotelRoom.slug.current}`)
                  }
                  className='px-6 underline text-green-600 dark:text-green-400 cursor-pointer py-4 font-medium whitespace-nowrap hover:text-green-700 dark:hover:text-green-300'
                >
                  {booking.hotelRoom.name}
                </th>
                <td className='px-6 py-4'>{booking.hotelRoom.price}</td>
                <td className='px-6 py-4'>{booking.totalPrice}</td>
                <td className='px-6 py-4'>{booking.discount}</td>
                <td className='px-6 py-4'>{booking.numberOfDays}</td>
                <td className='px-6 py-4'>0</td>
                <td className='px-6 py-4'>
                  <button
                    onClick={() => {
                      setRoomId(booking.hotelRoom._id);
                      toggleRatingModal();
                    }}
                    className='font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:underline transition-colors'
                  >
                    Rate
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className='px-6 py-8 text-center text-gray-500 dark:text-gray-400'
              >
                <div className='flex flex-col items-center space-y-2'>
                  <svg
                    className='w-12 h-12 text-gray-300 dark:text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                  <p className='text-lg font-medium'>No bookings found</p>
                  <p className='text-sm text-justify'>
                    You haven&apos;t made any bookings yet.
                  </p>
                  <button
                    onClick={() => router.push('/rooms')}
                    className='mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
                  >
                    Browse Rooms
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
