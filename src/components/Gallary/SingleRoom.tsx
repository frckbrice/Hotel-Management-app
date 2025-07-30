"use client";

import { FC } from "react";
import Image from "next/image";
import { Room } from "@/components/models/room";
import { useRouter } from "next/navigation";

type Props = {
  room: Room;
};

const SingleRoom: FC<Props> = ({ room }) => {
  const router = useRouter();

  const handleBookNow = () => {
    router.push(`/rooms/${room.slug.current}`);
  };

  return (
    <div className="relative h-64 overflow-hidden rounded-lg group bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
      <Image
        src={room.coverImage.url}
        alt={room.name}
        layout="fill"
        objectFit="cover"
        className="transform group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-lg font-bold">{room.name}</h3>
        <p className="text-white text-sm">${room.price}/night</p>
        <button
          onClick={handleBookNow}
          className="mt-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SingleRoom; 