import React, { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  price: number;
  discount: number;
  specialNote: string;
  checkinDate: Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
  calcMinCheckoutDate: () => Date | null;
  adults: number;
  setAdults: Dispatch<SetStateAction<number>>;
  noOfChildren: number;
  handleBookNowClick: () => void;
  isBooked: boolean;
  setNoOfChildren: Dispatch<SetStateAction<number>>;
  calcNumDays: () => number;
};

const BookRoomCta = ({
  price,
  discount,
  specialNote,
  checkinDate,
  setCheckinDate,
  setCheckoutDate,
  checkoutDate,
  calcMinCheckoutDate,
  noOfChildren,
  adults,
  setAdults,
  setNoOfChildren,
  isBooked,
  handleBookNowClick,
  calcNumDays,
}: Props) => {
  const discountPrice = price - (price / 100) * discount;

  // const calcNoOfDAys = () => {
  //   if (!checkinDate || !checkoutDate) return 0;
  //   const difftime = checkoutDate.getTime() - checkinDate.getTime();
  //   const noOfDays = Math.ceil(difftime / (24 * 60 * 60 * 1000));
  //   return noOfDays;
  // };

  return (
    <div className=" px-7 py-6">
      <h3>
        <span
          className={`${discount ? "text-gray-400" : ""} font-bold text-xl `}
        >
          $ {price}
        </span>
        {discount ? (
          <span className="font-bold text-xl">
            {" "}
            | discount {discount}%. Now{" "}
            <span className="text-tertiary-dark">$ {discountPrice}</span>
          </span>
        ) : (
          ""
        )}
      </h3>
      <div className=" w-full border-b-2 border-b-secondary my-2" />
      <div>{specialNote} </div>
      <div className="flex mt-4 gap-2">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="check-in-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check In date
          </label>
          <DatePicker
            selected={checkinDate}
            onChange={(date) => setCheckinDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            id="check-in-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="check-out-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Check Out date
          </label>
          <DatePicker
            selected={checkoutDate}
            onChange={(date) => setCheckoutDate(date)}
            dateFormat="dd/MM/yyyy"
            disabled={!checkinDate}
            minDate={calcMinCheckoutDate() ?? undefined}
            id="check-out-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      <div className="flex mt-4">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="adults"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Adults
          </label>
          <input
            type="number"
            id="adults"
            value={adults}
            onChange={(e) => setAdults(+e.target.value)}
            min={1}
            max={5}
            className="text-black w-full border border-gray-300 rounded-lg p-2.5"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="children"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Children
          </label>
          <input
            type="number"
            id="children"
            value={noOfChildren}
            onChange={(e) => setNoOfChildren(+e.target.value)}
            min={0}
            max={3}
            className=" text-black w-full border border-gray-300 rounded-lg p-2.5"
          />
        </div>
      </div>
      {calcNumDays() > 0 ? (
        <p className=" mt-3 text-green-500 font-bold">
          Total Price: $ {calcNumDays() * discountPrice}
        </p>
      ) : (
        <></>
      )}

      <button
        disabled={isBooked}
        onClick={handleBookNowClick}
        className="btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isBooked ? "Booked" : "Book Now"}
      </button>
    </div>
  );
};

export default BookRoomCta;
