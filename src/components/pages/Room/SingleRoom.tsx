"use client";

import { FC, memo, useCallback } from "react";
import { Room } from "@/types/room";
import { useRouter } from "next/navigation";
import LazyImage from "@/components/optimization/LazyImage";
import { Eye } from "lucide-react";

type Props = {
  room: Room;
  priority?: boolean;
  isLoading?: boolean;
};

const SingleRoom: FC<Props> = memo(
  ({ room, priority = false, isLoading = false }) => {
    const router = useRouter();
    console.log(room);

    const handleCardClick = useCallback(() => {
      if (!isLoading) {
        router.push(`/rooms/${room.slug.current}`);
      }
    }, [router, room.slug, isLoading]);

    const handleBookNow = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isLoading) {
          router.push(`/rooms/${room.slug.current}`);
        }
      },
      [router, room.slug, isLoading],
    );

    return (
      <article
        className="group cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 relative"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !isLoading) {
            handleCardClick();
          }
        }}
      >
        {/* Show skeleton only when loading */}
        {isLoading ? (
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl"></div>
        ) : (
          /* Image Container - full container when data is available */
          <div className="relative w-full h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
            <LazyImage
              src={room.coverImage.url}
              alt={`${room.name} - Hotel room view`}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              priority={priority}
              placeholderText={room.name}
              showPlaceholderText={true}
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Gradient overlay for better visual effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Book Now button with eye icon - appears on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={handleBookNow}
                className="px-4 py-2 bg-white/90 hover:bg-white text-gray-900 font-semibold rounded-full shadow-lg backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2"
                aria-label={`View ${room.name} details`}
              >
                <Eye className="w-4 h-4" />
                <span>Book Now</span>
              </button>
            </div>
          </div>
        )}
      </article>
    );
  },
);

SingleRoom.displayName = "SingleRoom";

export default SingleRoom;
