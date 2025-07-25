"use client";

import { getUserBookings, getUserData } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "@/app/(web)/loading";
import axios from "axios";
import { User } from "@/components/models/user";
import { Booking } from "@/components/models/booking";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import Table from "@/components/Table/table";
import Chart from "@/components/Chart/Chart";
import RatingModal from "@/components/RatingModal/RatingModal";
import BackDrop from "@/components/Backdrop/BackDrop";
import toast from "react-hot-toast";

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


    const toggleRatingModal = () => setIsRatingVisible((prev) => !prev);

    const fetchUserBooking = async () => await getUserBookings(userId);

    const reviewSubmitHandler = async () => {
        if (!ratingText.trim().length || !ratingValue)
            return toast.error(" Rating text and rating value are needed!!");

        if (!roomId) return toast.error("Please Select hotel Room needed!!");

        try {
            const { data } = await axios.post("/api/users", {
                roomId,
                reviewValue: ratingValue,
                reviewText: ratingText,
            });
            toast.success("review successfully submitted");
            setIsSubmittingReview(true);
        } catch (error) {
            console.log("error submitting submitting data", error);
            toast.error("Error submitting data, Review failed");
            setIsSubmittingReview(true);
        } finally {
            setRatingText("");
            setRatingValue(0);
            setRoomId(null);
            setIsSubmittingReview(false);
            setIsRatingVisible(false);
        }
    };

    const fetchUserData = async () => {
        const { data } = await axios.get<User>("/api/users");
        // const resp = await fetch("/api/users");
        // if (resp.ok) return await resp.json();
        return data;
    };

    const {
        data: userData,
        error: errorGettingUserData,
        isLoading: loadingUserData,
    } = useSWR("/api/users", fetchUserData);

    const {
        data: userBookings,
        error,
        isLoading,
    } = useSWR("/api/userbooking", fetchUserBooking);

    if (error || errorGettingUserData) {
        console.log("error: " + error);
        console.log("errorGettingUserData: " + errorGettingUserData);
        throw new Error(`Cannot fetch data: `, error || errorGettingUserData);
    }

    if (typeof userBookings === "undefined" && !isLoading)
        throw new Error("Cannot fetch data");
    if (isLoading || loadingUserData) return <LoadingSpinner />;

    return (
        <div className=" container mx-auto px-2 md:px-4 py-10">
            <div className=" grid grid-cols-12 gap-10">
                <div className=" hidden md:block col-span-4 lg:col-span-3 shadow-lg h-fit sticky to-10 ng-[#efff02]">
                    <div className=" md:w-[143px] w-28 h-28 md:h[143px] mx-auto mb-5 rounded-full overflow-hidden">
                        <Image
                            src={userData?.image ?? ""}
                            alt={userData?.name ?? "image"}
                            width={143}
                            height={143}
                            className=" img scale-animation rounded-full"
                        />
                    </div>
                    <div className=" font-normal py-4 text-left">
                        <h6 className=" text-xl font-bold pb-3">About</h6>
                        <p className=" text-sm ">{userData?.about ?? ""}</p>
                    </div>
                    <div className=" font-normal text-left">
                        <h6 className="text-xl font-bold pb-3">{userData?.name}</h6>
                    </div>
                    <div className=" flex items-center">
                        <p className=" mr-4"> Sign Out</p>
                        <FaSignOutAlt
                            size={30}
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className=" cursor-pointer"
                        />
                    </div>
                </div>

                <div className=" md:col-span-8 lg:col-span-9">
                    <div className="flex items-center">
                        <h5 className="text-2xl font-bold mr-3">
                            {" "}
                            Hello, {userData?.name}
                        </h5>
                    </div>
                    <div className="md:hidden w-14 h-14 rounded-l-full overflow-hidden ">
                        <Image
                            src="/images/alexander.jpg"
                            alt="User name"
                            width={56}
                            height={56}
                            className=" img scale-animation rounded-full"
                        />
                    </div>
                    <p className=" block w-fit md:hidden text-sm py-2">
                        {userData?.about ?? ""}
                    </p>
                    <p className=" text-xs py-2 font-medium">
                        joined In {userData?._createdAt.split("T")[0]}
                    </p>
                    <div className=" md:hidden flex items-center my-2">
                        <p className=" mr-2">Sign Out</p>
                        <FaSignOutAlt
                            size={30}
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className=" cursor-pointer"
                        />
                    </div>
                    <nav className="sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb-8 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mt-7">
                        <ol
                            className={`${currentNav === "bookings" ? "text-blue-600" : "text-gray-700"
                                } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
                        >
                            <li
                                onClick={() => setCurrentNav("bookings")}
                                className="inline-flex items-center cursor-pointer"
                            >
                                <BsJournalBookmarkFill />
                                <a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
                                    Current Bookings
                                </a>
                            </li>
                        </ol>
                        <ol
                            className={`${currentNav === "amount" ? "text-blue-600" : "text-gray-700"
                                } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
                        >
                            <li
                                onClick={() => setCurrentNav("amount")}
                                className="inline-flex items-center cursor-pointer"
                            >
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
    );
};

// export default UserDetails;
export default UserDetails;
