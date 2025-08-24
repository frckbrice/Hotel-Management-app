"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import LazyImage from "@/components/optimization/LazyImage";
import GallerySkeleton from "./GallerySkeleton";

interface Room {
  coverImage: { url: string };
  name: string;
  description: string;
  slug: { current: string };
  type: string;
  price: number;
}

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  const data = await res.json();
  return data.data; // Return the rooms data from the API response
};

const Gallery = () => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const {
    data: rooms,
    error,
    isLoading,
  } = useSWR<Room[]>("/api/rooms", fetcher);

  return (
    <section className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-600 dark:text-green-400 font-medium text-sm uppercase tracking-wider">
                Our Collection
              </span>
              <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-6">
            Luxury Rooms & Suites
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto mb-8">
            Experience the elegance and comfort of our meticulously designed
            accommodations
          </p>

          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-green-500 dark:to-green-400"></div>
            <div className="w-8 h-0.5 bg-green-500 dark:bg-green-400"></div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-green-500 dark:to-green-400"></div>
          </div>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <GallerySkeleton />
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            Failed to load rooms. Please try again later.
          </div>
        ) : !rooms || rooms.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No rooms found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {rooms.map((room, index) => (
              <div
                key={room.slug.current}
                className="group relative h-full"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Main Card */}
                <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:rotate-1 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden flex-shrink-0">
                    <LazyImage
                      src={room.coverImage?.url || "/images/visualsofdana.jpg"}
                      alt={room.name}
                      width={400}
                      height={500}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority={index < 2}
                      quality={80}
                      placeholderText={room.name}
                      showPlaceholderText={true}
                      objectFit="fill"
                      aspectRatio="custom"
                      rounded="none"
                    />

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    {/* Hover Content */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl p-4 transform scale-75 group-hover:scale-100 transition-all duration-500 shadow-2xl border border-white/20">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-500 dark:bg-green-400 rounded-full">
                            <svg
                              className="w-5 h-5 text-white dark:text-gray-900"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </div>
                          <span
                            className="text-gray-900 dark:text-white font-medium cursor-pointer"
                            onClick={() =>
                              router.push(`/rooms/${room.slug.current}`)
                            }
                          >
                            View Details
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {room.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-1">
                      {room.description}
                    </p>
                    <button
                      onClick={() => router.push(`/rooms/${room.slug.current}`)}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-auto"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={() => router.push("/rooms")}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
          >
            <span>Explore All Rooms</span>
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
