"use client";
import { FC } from "react";
import Image from "next/image";
import { Room } from "../models/room";
import Link from "next/link";



type Props = {
  featuredRoom: Room;
};
const FeaturedRoom: FC<Props> = (props) => {
  const { featuredRoom } = props;
  // console.log(featuredRoom.images[0].url);
  return (
    <section className="flex flex-col lg:flex-row px-4 lg:px-8 py-16 sm:py-20 lg:py-10 mx-4 lg:m-20 items-center gap-8 lg:gap-12 container mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
      <div className="w-full lg:w-1/2">
        <div className="grid gap-4 lg:gap-8 grid-cols-1">
          <div className="rounded-2xl overflow-hidden h-48 lg:h-64">
            <Image
              src={featuredRoom?.coverImage.url}
              alt={featuredRoom?.name}
              width={300}
              height={300}
              className="img scale-animation w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-8 h-32 lg:h-48">
            {featuredRoom.images.slice(0, 2).map((image: any) => (
              <div key={image._key} className="rounded-2xl overflow-hidden">
                <Image
                  src={image.url}
                  alt={image._key}
                  width={300}
                  height={300}
                  className="img scale-animation w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 lg:py-10 text-center lg:text-left">
        <h3 className="font-heading mb-6 lg:mb-12 text-2xl lg:text-3xl">Featured Room</h3>
        <p className="font-normal max-w-md mx-auto lg:mx-0 text-sm lg:text-base text-justify lg:text-left leading-relaxed">
          {featuredRoom.description}
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mt-8 lg:mt-5 gap-6 lg:gap-0">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-0">
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4 lg:p-6 border border-green-200 dark:border-green-700">
              <p className="font-extrabold sm:text-sm lg:text-lg text-center text-green-700 text-2xl md:font-heading  dark:text-green-300 mb-2">Start From</p>
              <p className="font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-green-600 dark:text-green-400">
                $ {featuredRoom.price}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-4 lg:p-6 border border-yellow-200 dark:border-yellow-700">
              <p className="font-extrabold sm:text-sm lg:text-lg text-center text-green-700 text-2xl md:font-heading  dark:text-green-300 mb-2">Discount</p>
              <p className="font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-yellow-600 dark:text-yellow-400">
                $ {featuredRoom.discount}
              </p>
            </div>
          </div>
          <Link
            href={`/rooms/${featuredRoom.slug.current}`}
            className="hover:scale-110 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-none transition-all duration-300 h-fit text-center px-6 py-4 lg:py-5 lg:px-7 rounded-2xl font-bold text-sm lg:text-xl shadow-lg hover:shadow-xl"
          >
            More Details
          </Link>
        </div>
      </div>
    </section>
  );
};
export default FeaturedRoom;
