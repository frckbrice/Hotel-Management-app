"use client";

import { getUserBookings } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "@/app/loading";
import axios from "axios";
import { User } from "@/types/user";
import { FaSignOutAlt } from "react-icons/fa";
import UserAvatar from "@/components/global/Header/user-avatar";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { useSearchParams } from "next/navigation";
import Table from "@/components/pages/Users/Table/table";
import Chart from "./Chart/Chart";
import RatingModal from "@/components/pages/Users/Rating/RatingModal/RatingModal";
import BackDrop from "@/components/global/Backdrop/BackDrop";
import toast from "react-hot-toast";

import router from "next/router";

type Props = {
  userId: string;
};

const UserDetails = ({ userId }: Props) => {
  const [currentNav, setCurrentNav] = useState<
    "bookings" | "amount" | "ratings"
  >("bookings");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [ratingText, setRatingText] = useState("");

  // get user from session
  const { data: session } = useSession();
  const user = session?.user;
  const searchParams = useSearchParams();

  // Check for payment success - show toast only once and clear URL parameter
  const hasShownPaymentToast = useRef(false);

  const fetchUserBooking = async () => await getUserBookings(userId);

  const fetchUserData = async () => {
    const { data } = await axios.get<User>("/api/users");
    // const resp = await fetch("/api/users");
    // if (resp.ok) return await resp.json();
    console.log("\n\nuserData", data);
    return data;
  };

  useEffect(() => {
    if (!session || session.user.id !== userId) {
      router.push("/");
    }
  }, [session, userId]);
  useEffect(() => {
    if (!user) {
      // Redirect to auth page with current page as callback URL
      const currentUrl = window.location.pathname;
      router.push(`/auth?callbackUrl=${encodeURIComponent(currentUrl)}`);
    }
  }, [user]);

  // get user data
  const {
    data: userData,
    error: errorGettingUserData,
    isLoading: loadingUserData,
  } = useSWR("/api/users", fetchUserData);

  const {
    data: userBookings,
    error,
    isLoading,
    mutate: refreshBookings,
  } = useSWR("/api/userbooking", fetchUserBooking);

  useEffect(() => {
    const paymentStatus = searchParams.get("payment_status");
    if (paymentStatus === "success" && !hasShownPaymentToast.current) {
      toast.success("Payment successful! Your booking has been created.");
      hasShownPaymentToast.current = true;

      // Clear the URL parameter to prevent showing toast again
      const url = new URL(window.location.href);
      url.searchParams.delete("payment_status");
      window.history.replaceState({}, "", url.toString());

      // Refresh bookings after successful payment
      setTimeout(() => {
        refreshBookings();
      }, 1000);
    }
  }, [searchParams, refreshBookings]);

  const toggleRatingModal = () => setIsRatingVisible((prev) => !prev);

  const reviewSubmitHandler = async (): Promise<undefined | string> => {
    if (!ratingText.trim().length || !ratingValue) {
      toast.error("Rating text and rating value are needed!");
      return;
    }

    if (!roomId) {
      toast.error("Please select a hotel room!");
      return;
    }

    try {
      setIsSubmittingReview(true);
      console.log("Submitting review:", {
        roomId,
        reviewValue: ratingValue,
        reviewText: ratingText,
      });

      const { data } = await axios.post("/api/users", {
        roomId,
        reviewValue: ratingValue,
        reviewText: ratingText,
      });

      toast.success("Review successfully submitted!");

      // Reset form
      setRatingText("");
      setRatingValue(0);
      setRoomId(null);
      setIsRatingVisible(false);

      return "success";
    } catch (error: any) {
      console.error("Error submitting review:", error);
      const errorMessage =
        error.response?.data || "Error submitting review. Please try again.";
      toast.error(errorMessage);
      return errorMessage;
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (error || errorGettingUserData) {
    console.log("error: " + error);
    console.log("errorGettingUserData: " + errorGettingUserData);
    throw new Error(`Cannot fetch data: `, error || errorGettingUserData);
  }

  if (typeof userBookings === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  if (isLoading || loadingUserData) return <LoadingSpinner />;

  return (
    <div className="min-h-screen p-10">
      <div className="container mx-auto px-2 md:px-4 py-10">
        <div className="grid grid-cols-12 gap-10">
          <div className="hidden md:block col-span-4 lg:col-span-3 sticky top-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6">
            {/* Profile Image */}
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-green-300 dark:border-green-600 shadow-lg">
              <UserAvatar
                src={userData?.image || user?.image}
                alt={userData?.name || user?.name || "User"}
                size={128}
                className="w-full h-full object-cover"
              />
            </div>

            {/* About Section */}
            <div className="text-center flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                About
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-justify">
                {userData?.about || user?.name || "No description available"}
              </p>
            </div>

            {/* Username / Name */}
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                {userData?.name || user?.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {userData?.email || user?.email}
              </p>
            </div>

            {/* Join Date */}
            {userData?._createdAt && (
              <div className="text-center">
                <p className="text-xs py-2 font-medium text-gray-600 dark:text-gray-400">
                  Joined: {userData._createdAt.split("T")[0]}
                </p>
              </div>
            )}

            {/* Sign Out Button */}
            <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                <FaSignOutAlt size={20} />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-9">
            <div className="flex items-center">
              <h5 className="text-2xl font-bold mr-3 text-gray-800 dark:text-white">
                Hello, {user?.name}
              </h5>
            </div>
            <div className="md:hidden w-14 h-14 rounded-l-full overflow-hidden">
              <UserAvatar
                src={userData?.image || user?.image}
                alt={userData?.name || user?.name || "User"}
                size={56}
                className="img scale-animation rounded-full"
              />
            </div>
            <p className="block w-fit md:hidden text-sm py-2 text-gray-600 dark:text-gray-300 text-justify">
              {userData?.about ?? ""}
            </p>
            {userData?._createdAt && (
              <p className="text-xs py-2 font-medium text-gray-600 dark:text-gray-400">
                Joined: {userData._createdAt.split("T")[0]}
              </p>
            )}
            <div className="md:hidden flex items-center my-2">
              <p className="mr-2 text-gray-700 dark:text-gray-300">Sign Out</p>
              <FaSignOutAlt
                size={30}
                onClick={() => signOut({ callbackUrl: "/" })}
                className="cursor-pointer text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              />
            </div>
            <nav className="sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb-8 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-lg mt-7">
              <ol
                className={`${
                  currentNav === "bookings"
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-700 dark:text-gray-300"
                } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3 cursor-pointer hover:text-green-600 dark:hover:text-green-400 transition-colors`}
                onClick={() => setCurrentNav("bookings")}
              >
                <li className="inline-flex items-center">
                  <BsJournalBookmarkFill />
                  <a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
                    Current Bookings
                  </a>
                </li>
              </ol>
              <ol
                className={`${
                  currentNav === "amount"
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-700 dark:text-gray-300"
                } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3 cursor-pointer hover:text-green-600 dark:hover:text-green-400 transition-colors`}
                onClick={() => setCurrentNav("amount")}
              >
                <li className="inline-flex items-center">
                  <GiMoneyStack />
                  <a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
                    Amount Spent
                  </a>
                </li>
              </ol>
            </nav>

            {currentNav === "bookings" ? (
              userBookings && (
                <Table
                  bookingDetails={userBookings}
                  setRoomId={setRoomId}
                  toggleRatingModal={toggleRatingModal}
                />
              )
            ) : (
              <></>
            )}

            {currentNav === "amount" ? (
              userBookings && <Chart userBookings={userBookings} />
            ) : (
              <></>
            )}

            {/* Debug Section - Development Only */}
            {/* {process.env.NODE_ENV === 'development' && (
              <div className='mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg'>
                <h3 className='text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4'>
                  Debug Info
                </h3>
                <div className='space-y-2 text-sm'>
                  <p>
                    <strong>User ID:</strong> {userId}
                  </p>
                  <p>
                    <strong>Session User:</strong> {user?.name} ({user?.email})
                  </p>
                  <p>
                    <strong>User Data:</strong>{' '}
                    {userData ? 'Loaded' : 'Not loaded'}
                  </p>
                  <p>
                    <strong>User Data Name:</strong> {userData?.name || 'N/A'}
                  </p>
                  <p>
                    <strong>User Data About:</strong> {userData?.about || 'N/A'}
                  </p>
                  <p>
                    <strong>User Data Email:</strong> {userData?.email || 'N/A'}
                  </p>
                  <p>
                    <strong>User Data Created:</strong>{' '}
                    {userData?._createdAt || 'N/A'}
                  </p>
                  <p>
                    <strong>Bookings:</strong>{' '}
                    {userBookings
                      ? `${userBookings.length} bookings`
                      : 'No bookings'}
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{' '}
                    {searchParams.get('payment_status') || 'None'}
                  </p>
                </div>
                <div className='flex gap-2 mt-4'>
                  <button
                    onClick={async () => {
                      try {
                        // First get a real room ID
                        const roomResponse = await fetch('/api/get-test-room');
                        const roomData = await roomResponse.json();

                        if (!roomData.success) {
                          toast.error(
                            'Failed to get test room: ' + roomData.error
                          );
                          return;
                        }

                        const response = await fetch('/api/test-booking', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            roomId: roomData.room.id,
                            checkinDate: '2024-01-15',
                            checkoutDate: '2024-01-17',
                            adults: 2,
                            children: 0,
                            numberOfDays: 2,
                            totalPrice: roomData.room.price * 2,
                            discount: 0,
                          }),
                        });
                        const data = await response.json();
                        console.log('Test booking response:', data);
                        if (data.success) {
                          toast.success('Test booking created!');
                          refreshBookings();
                        } else {
                          toast.error('Test booking failed: ' + data.error);
                        }
                      } catch (error) {
                        console.error('Test booking error:', error);
                        toast.error('Test booking failed: ' + error);
                      }
                    }}
                    className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
                  >
                    Test Booking Creation
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        // First get a real room ID
                        const roomResponse = await fetch('/api/get-test-room');
                        const roomData = await roomResponse.json();

                        if (!roomData.success) {
                          toast.error(
                            'Failed to get test room: ' + roomData.error
                          );
                          return;
                        }

                        const response = await fetch('/api/test-webhook', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            roomId: roomData.room.id,
                            checkinDate: '2024-01-15',
                            checkoutDate: '2024-01-17',
                            adults: 2,
                            children: 0,
                            numberOfDays: 2,
                            totalPrice: roomData.room.price * 2,
                            discount: 0,
                          }),
                        });
                        const data = await response.json();
                        console.log('Test webhook response:', data);
                        if (data.success) {
                          toast.success('Test webhook booking created!');
                          refreshBookings();
                        } else {
                          toast.error('Test webhook failed: ' + data.error);
                        }
                      } catch (error) {
                        console.error('Test webhook error:', error);
                        toast.error('Test webhook failed: ' + error);
                      }
                    }}
                    className='px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700'
                  >
                    Test Webhook Booking
                  </button>
                  <button
                    onClick={() => refreshBookings()}
                    className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
                  >
                    Force Refresh Bookings
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch(
                          '/api/test-token-permissions'
                        );
                        const data = await response.json();
                        console.log('Token permissions test:', data);
                        if (data.success) {
                          const message = `Read: ${data.readPermissions}, Write: ${data.writePermissions}, Token: ${data.tokenUsed}`;
                          toast.success(message);
                          alert(JSON.stringify(data, null, 2));
                        } else {
                          toast.error('Token test failed: ' + data.error);
                        }
                      } catch (error) {
                        console.error('Token permissions test error:', error);
                        toast.error('Token test failed: ' + error);
                      }
                    }}
                    className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'
                  >
                    Test Token Permissions
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/debug-bookings');
                        const data = await response.json();
                        console.log('Debug bookings response:', data);
                        if (data.success) {
                          toast.success(
                            `Found ${data.totalUserBookings} user bookings, ${data.totalAllBookings} total bookings`
                          );
                          alert(JSON.stringify(data, null, 2));
                        } else {
                          toast.error('Debug failed: ' + data.error);
                        }
                      } catch (error) {
                        console.error('Debug bookings error:', error);
                        toast.error('Debug failed: ' + error);
                      }
                    }}
                    className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700'
                  >
                    Debug Bookings
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch(
                          '/api/check-latest-bookings'
                        );
                        const data = await response.json();
                        console.log('Check latest bookings response:', data);
                        if (data.success) {
                          const message = `With prefix: ${data.totalBookingsWithPrefix}, Without prefix: ${data.totalBookingsWithoutPrefix}`;
                          toast.success(message);
                          alert(JSON.stringify(data, null, 2));
                        } else {
                          toast.error('Check latest failed: ' + data.error);
                        }
                      } catch (error) {
                        console.error('Check latest bookings error:', error);
                        toast.error('Check latest failed: ' + error);
                      }
                    }}
                    className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'
                  >
                    Check Latest Bookings
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/test-session');
                        const data = await response.json();
                        console.log('Session test response:', data);
                        if (data.success) {
                          const session = data.session;
                          const message = `Session: ${session.hasSession}, User: ${session.hasUser}, UserID: ${session.hasUserId}`;
                          toast.success(message);
                          alert(JSON.stringify(data, null, 2));
                        } else {
                          toast.error('Session test failed: ' + data.error);
                        }
                      } catch (error) {
                        console.error('Session test error:', error);
                        toast.error('Session test failed: ' + error);
                      }
                    }}
                    className='px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700'
                  >
                    Test Session
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/check-all-bookings');
                        const data = await response.json();
                        console.log('Check all bookings response:', data);
                        if (data.success) {
                          const message = `Total: ${data.totalBookings} bookings, ${data.totalUsers} users`;
                          toast.success(message);
                          alert(JSON.stringify(data, null, 2));
                        } else {
                          toast.error('Check all failed: ' + data.error);
                        }
                      } catch (error) {
                        console.error('Check all bookings error:', error);
                        toast.error('Check all failed: ' + error);
                      }
                    }}
                    className='px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700'
                  >
                    Check All Bookings
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/debug-user-data');
                        const data = await response.json();
                        console.log('Debug user data response:', data);
                        if (data.success) {
                          const message = `User Data: ${data.userData ? 'Found' : 'Not found'}`;
                          toast.success(message);
                          alert(JSON.stringify(data, null, 2));
                        } else {
                          toast.error('Debug user data failed: ' + data.error);
                        }
                      } catch (error) {
                        console.error('Debug user data error:', error);
                        toast.error('Debug user data failed: ' + error);
                      }
                    }}
                    className='px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700'
                  >
                    Debug User Data
                  </button>
                  <button
                    onClick={() => {
                      console.log('Current userData from SWR:', userData);
                      console.log('Current user from session:', user);
                      toast.success('Check console for userData details');
                    }}
                    className='px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700'
                  >
                    Log UserData
                  </button>
                </div>
              </div>
            )} */}
          </div>
        </div>
        <RatingModal
          isOpen={isRatingVisible}
          ratingValue={ratingValue as number}
          setRatingValue={setRatingValue!}
          ratingText={ratingText}
          setRatingText={setRatingText}
          reviewSubmitHandler={reviewSubmitHandler}
          isSubmittingReview={isSubmittingReview}
          toggleRatingModal={toggleRatingModal}
        />
        <BackDrop isOpen={isRatingVisible} />
      </div>
    </div>
  );
};

// export default UserDetails;
export default UserDetails;
