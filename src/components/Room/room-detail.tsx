'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { LiaFireExtinguisherSolid } from 'react-icons/lia';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { GiSmokeBomb } from 'react-icons/gi';

import axios from 'axios';
import { getRoom } from '@/libs/apis';
import LoadingSpinner from '@/app/loading';
import HotelPhotoGallery from '@/components/HotelGalleryPhoto/HotelgalleryPhoto';
import toast from 'react-hot-toast';
import BookRoomCta from '@/components/BookRoomCta/BookRoomCta';
import { getStripe } from '@/libs/stripe';
import RoomReview from '@/components/Roomreview/RoomReview';
// import RoomReview from "@/components/RoomReview/RoomReview";

type RoomDetailsProps = {
  slug: string;
};

const RoomDetails = ({ slug }: RoomDetailsProps) => {
  // Use useParams to get the slug from the URL
  //   const params = useParams();
  //   const slug = typeof params === "object" && params !== null ? (params as any).slug : undefined;

  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);

  const fetchRoom = async () => getRoom(slug);
  const {
    data: room,
    error,
    isLoading,
  } = useSWR(slug ? ['/api/room', slug] : null, fetchRoom);

  if (error) throw new Error('Cannot fetch room data');
  if (typeof room === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');
  if (!room) return <LoadingSpinner />;

  const calcMinCheckoutDate = () => {
    if (checkinDate) {
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return null;
  };

  const handleBookNowClick = async () => {
    if (!checkinDate || !checkoutDate)
      return toast.error('Please provide checkin / checkout date');
    if (checkinDate > checkoutDate)
      return toast.error('Please choose a valid checkin date');

    const numberOfDays = calcNumDays();
    const hotelRoomSlug = room.slug.current;

    const stripe = await getStripe();
    try {
      //* create a payement session that will load stripe form payement
      const { data: stripeSession } = await axios.post('/api/stripe', {
        checkinDate,
        checkoutDate,
        adults,
        children: noOfChildren,
        numberOfDays,
        hotelRoomSlug,
      });

      if (stripe) {
        //* the checkout page displays only when stripe session is created and returned to get the ID of that session.
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });
        if (result.error) {
          toast.error('Payment Failed');
        }
      }
    } catch (error) {
      console.log('Error stripe payement: ', error);
      toast.error('An error occured');
    }
  };

  const calcNumDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 p-5 pb-10'>
      <HotelPhotoGallery photos={room.images} />
      <div className='container mx-auto mt-20'>
        <div className='md:grid md:grid-cols-12 gap-10 px-3'>
          <div className='md:col-span-8 md:w-full'>
            <div>
              <h2 className='font-bold text-left text-lg md:text-2xl text-gray-800 dark:text-white'>
                {room.name} ({room.dimension})
              </h2>
              <div className='flex my-11'>
                {room.offeredAmenities.map(amenity => (
                  <div
                    key={amenity._key}
                    className='md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg grid place-content-center border border-green-200 dark:border-green-700'
                  >
                    <i
                      className={`fa-solid ${amenity.icon} md:text-2xl text-green-600 dark:text-green-400`}
                    ></i>
                    <p className='text-xs md:text-base pt-3 text-gray-700 dark:text-gray-300'>
                      {amenity.amenity}
                    </p>
                  </div>
                ))}
              </div>
              <div className='mb-11'>
                <h2 className='font-bold text-3xl mb-2 text-gray-800 dark:text-white'>
                  Description
                </h2>
                <p className='text-gray-700 dark:text-gray-300 text-justify'>
                  {room.description}
                </p>
              </div>
              <div className='mb-11'>
                <h2 className='font-bold text-3xl mb-2 text-gray-800 dark:text-white'>
                  Offered Amenities
                </h2>
                <div className='grid grid-cols-2'>
                  {room.offeredAmenities.map(amenity => (
                    <div
                      key={amenity._key}
                      className='flex items-center md:my-0 my-1'
                    >
                      <i
                        className={`fa-solid ${amenity.icon} text-green-600 dark:text-green-400`}
                      ></i>
                      <p className='text-xs md:text-base ml-2 text-gray-700 dark:text-gray-300'>
                        {amenity.amenity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='mb-11'>
                <h2 className='font-bold text-3xl mb-2 text-gray-800 dark:text-white'>
                  Safety And Hygiene
                </h2>
                <div className='grid grid-cols-2'>
                  <div className='flex items-center my-1 md:my-0'>
                    <MdOutlineCleaningServices className='text-green-600 dark:text-green-400' />
                    <p className='ml-2 md:text-base text-xs text-gray-700 dark:text-gray-300'>
                      Daily Cleaning
                    </p>
                  </div>
                  <div className='flex items-center my-1 md:my-0'>
                    <LiaFireExtinguisherSolid className='text-green-600 dark:text-green-400' />
                    <p className='ml-2 md:text-base text-xs text-gray-700 dark:text-gray-300'>
                      Fire Extinguishers
                    </p>
                  </div>
                  <div className='flex items-center my-1 md:my-0'>
                    <AiOutlineMedicineBox className='text-green-600 dark:text-green-400' />
                    <p className='ml-2 md:text-base text-xs text-gray-700 dark:text-gray-300'>
                      Disinfections and Sterilizations
                    </p>
                  </div>
                  <div className='flex items-center my-1 md:my-0'>
                    <GiSmokeBomb className='text-green-600 dark:text-green-400' />
                    <p className='ml-2 md:text-base text-xs text-gray-700 dark:text-gray-300'>
                      Smoke Detectors
                    </p>
                  </div>
                </div>
              </div>
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-green-200 dark:border-green-700'>
                <div className='items-center mb-4'>
                  <p className='md:text-lg font-semibold text-gray-800 dark:text-white'>
                    Customer Reviews
                  </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* <span className=" text-red-400">In building process</span>{" "}
                   */}
                  <RoomReview roomId={room._id} />
                </div>
              </div>
            </div>
          </div>
          <div className='md:col-span-4 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-green-200 dark:border-green-700 sticky top-10 md:top-20 h-fit overflow-auto'>
            <BookRoomCta
              discount={room.discount}
              price={room.price}
              specialNote={room.specialNote}
              checkinDate={checkinDate}
              setCheckinDate={setCheckinDate}
              checkoutDate={checkoutDate}
              setCheckoutDate={setCheckoutDate}
              calcMinCheckoutDate={calcMinCheckoutDate}
              adults={adults}
              noOfChildren={noOfChildren}
              setAdults={setAdults}
              setNoOfChildren={setNoOfChildren}
              isBooked={room.isBooked}
              handleBookNowClick={handleBookNowClick}
              calcNumDays={calcNumDays}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoomDetails;
