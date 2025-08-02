import { FC } from "react";
import { Room } from "@/types/room";
import Link from "next/link";
import { BadgeCheck, Ban } from "lucide-react";
import LazyImage from "@/components/optimization/LazyImage";

type Props = {
  room: Room;
};

const RoomCard: FC<Props> = ({ room }) => {
  const { coverImage, name, price, type, description, slug, isBooked } = room;

  return (
    <div className="group relative w-full max-w-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl bg-white dark:bg-gray-900 transition-all duration-300">
      {/* Badge for room type */}
      <div className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 dark:text-white shadow-sm">
        {type} Room
      </div>
      <div className="relative h-56 w-full">
        <LazyImage
          src={coverImage.url}
          alt={name}
          width={300}
          height={300}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          priority={true}
          placeholderText={name}
          showPlaceholderText={true}
          quality={80}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {isBooked && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-sm px-3 py-1 rounded-full shadow-md z-10">
            Booked
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {name}
          </h3>
          <span className="text-green-600 dark:text-green-400 font-semibold text-lg">
            ${price}
          </span>
        </div>

        <div className="mb-2 text-sm font-medium text-green-700 dark:text-green-300 uppercase tracking-wide">
          {type} Room
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 text-justify">
          {description.slice(0, 100)}...
        </p>

        <Link
          href={`/rooms/${slug.current}`}
          className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg ${
            isBooked
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 hover:shadow-xl hover:-translate-y-1"
          }`}
        >
          {isBooked ? (
            <>
              <Ban size={16} /> Unavailable
            </>
          ) : (
            <>
              <BadgeCheck size={16} /> Book Now
            </>
          )}
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
