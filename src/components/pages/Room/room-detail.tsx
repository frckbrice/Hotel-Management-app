"use client";
import { useState } from "react";
import useSWR from "swr";
import { MdOutlineCleaningServices } from "react-icons/md";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiSmokeBomb } from "react-icons/gi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import axios from "axios";
import LoadingSpinner from "@/app/loading";
import HotelPhotoGallery from "../HotelGalleryPhoto/HotelgalleryPhoto";
import toast from "react-hot-toast";
import BookRoomCta from "@/components/BookRoomCta/BookRoomCta";
import { getStripe } from "@/libs/stripe";
import RoomReview from "./Roomreview/RoomReview";

type RoomDetailsProps = {
  slug: string;
};

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  const data = await res.json();
  return data.data; // Return the room data from the API response
};

const RoomDetails = ({ slug }: RoomDetailsProps) => {
  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [noOfChildren, setNoOfChildren] = useState(0);
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    data: room,
    error,
    isLoading,
  } = useSWR(slug ? `/api/rooms/${slug}` : null, fetcher);

  if (error) throw new Error("Cannot fetch room data");
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");
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
    // Check if user is authenticated
    if (status === "loading") {
      return toast.error(
        "Please wait while we check your authentication status",
      );
    }

    if (!session) {
      toast.error("Please sign in to book a room");
      router.push("/auth");
      return;
    }

    if (!checkinDate || !checkoutDate) {
      return toast.error("Please select checkin and checkout dates");
    }

    if (checkinDate >= checkoutDate) {
      return toast.error("Please choose a valid checkin date");
    }

    const numberOfDays = calcNumDays();
    const hotelRoomSlug = room.slug.current;

    try {
      // Log for debugging (only in development)
      if (process.env.NODE_ENV === "development") {
        const publishableKey =
          process.env.STRIPE_PUBLISHABLE_KEY ||
          process.env.STRIPE_PUBLISHABLE_KEY;
        console.log("Stripe publishable key available:", !!publishableKey);
      }

      const stripe = await getStripe();

      if (!stripe) {
        toast.error("Payment system is not available. Please try again later.");
        return;
      }

      //* create a payement session that will load stripe form payement
      const { data: stripeSession } = await axios.post("/api/stripe", {
        checkinDate,
        checkoutDate,
        adults,
        children: noOfChildren,
        numberOfDays,
        hotelRoomSlug,
      });

      //* the checkout page displays only when stripe session is created and returned to get the ID of that session.
      const result = await stripe.redirectToCheckout({
        sessionId: stripeSession.id,
      });

      if (result.error) {
        toast.error("Payment Failed");
      }
    } catch (error: any) {
      console.log("Error stripe payement: ", error);

      if (error.message === "Stripe publishable key is not configured") {
        toast.error(
          "Payment system is not configured. Please contact support.",
        );
      } else if (
        error.response?.status === 400 &&
        error.response?.data === "Authentication  required"
      ) {
        toast.error("Please sign in to book a room");
        router.push("/auth");
      } else {
        toast.error("An error occurred during payment setup");
      }
    }
  };

  const calcNumDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Image Gallery Section */}
      <div className="relative">
        <div className="w-full h-[60vh] md:h-[70vh] overflow-hidden">
          <HotelPhotoGallery photos={room.images} />
        </div>

        {/* Overlay gradient for better content transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50/80 to-transparent dark:from-gray-900/80 dark:to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto -mt-16 relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
          {/* Left Column - Room Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Room Header Card */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {room.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {room.dimension}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                    ${room.price}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    per night
                  </p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                About This Room
              </h3>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  {room.description}
                </p>
              </div>
            </div>

            {/* All Amenities Section */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                All Amenities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room.offeredAmenities.map((amenity: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-300"
                  >
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i
                        className={`fa-solid ${amenity.icon} text-green-600 dark:text-green-400 text-sm`}
                      ></i>
                    </div>
                    <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
                      {amenity.amenity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Section */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Safety & Hygiene
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mr-4">
                    <MdOutlineCleaningServices className="text-blue-600 dark:text-blue-400 text-lg" />
                  </div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Daily Cleaning
                  </p>
                </div>
                <div className="flex items-center p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mr-4">
                    <LiaFireExtinguisherSolid className="text-red-600 dark:text-red-400 text-lg" />
                  </div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Fire Extinguishers
                  </p>
                </div>
                <div className="flex items-center p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mr-4">
                    <AiOutlineMedicineBox className="text-green-600 dark:text-green-400 text-lg" />
                  </div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Disinfections and Sterilizations
                  </p>
                </div>
                <div className="flex items-center p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800/50">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/40 rounded-full flex items-center justify-center mr-4">
                    <GiSmokeBomb className="text-yellow-600 dark:text-yellow-400 text-lg" />
                  </div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Smoke Detectors
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Customer Reviews
                </h3>
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    (4.8)
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <RoomReview roomId={room._id} />
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 dark:border-gray-700/50 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4">
                  <h4 className="text-white font-bold text-lg text-center">
                    Book Your Stay
                  </h4>
                  {status === "loading" ? (
                    <div className="text-white/80 text-sm text-center mt-2">
                      Checking authentication...
                    </div>
                  ) : session ? (
                    <div className="text-white/80 text-sm text-center mt-2">
                      ✓ Signed in as {session.user?.name || session.user?.email}
                    </div>
                  ) : (
                    <div className="text-white/80 text-sm text-center mt-2">
                      ⚠ Please sign in to book
                    </div>
                  )}
                </div>
                <div className="p-6">
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
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
