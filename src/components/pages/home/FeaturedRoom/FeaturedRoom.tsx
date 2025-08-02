"use client";

import { Room } from "@/types/room"; // Adjust the import path as necessary
import Link from "next/link";
import LazyImage from "@/components/optimization/LazyImage";

type Props = {
  featuredRoom: Room;
};

const FeaturedRoom = ({ featuredRoom }: Props) => {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent mb-4">
            Featured Room
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-3xl transition-all duration-500">
          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery Section */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8">
              <div className="space-y-4 lg:space-y-6">
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden group">
                  <div className="aspect-[4/3] relative">
                    <LazyImage
                      src={featuredRoom?.coverImage.url}
                      alt={featuredRoom?.name}
                      width={800}
                      height={600}
                      className="object-cover transition-transform duration-700 group-hover:scale-105 w-full h-full"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={true}
                      placeholderText={featuredRoom?.name}
                      showPlaceholderText={true}
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  {featuredRoom.images
                    .slice(0, 2)
                    .map((image: any, index: number) => (
                      <div
                        key={image._key}
                        className="relative rounded-xl overflow-hidden group cursor-pointer"
                      >
                        <div className="aspect-[4/3] relative">
                          <LazyImage
                            src={image.url}
                            alt={`${featuredRoom.name} - Image ${index + 1}`}
                            width={400}
                            height={300}
                            className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
                            sizes="(max-width: 768px) 50vw, 25vw"
                            placeholderText={`${featuredRoom.name} ${index + 1}`}
                            showPlaceholderText={true}
                            quality={75}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
              <div className="space-y-6 lg:space-y-8">
                {/* Room Name */}
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {featuredRoom.name}
                  </h3>
                  <div className="w-16 h-0.5 bg-green-600 dark:bg-green-400"></div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-base lg:text-lg leading-relaxed max-w-lg">
                  {featuredRoom.description}
                </p>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  {/* Price Card */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 via-green-100 to-green-200 dark:from-green-900/30 dark:via-green-800/20 dark:to-green-700/30 p-6 border border-green-200 dark:border-green-700/50 hover:shadow-lg transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 text-center">
                      <p className="text-green-700 dark:text-green-300 font-semibold text-sm lg:text-base mb-2">
                        Starting From
                      </p>
                      <p className="text-green-800 dark:text-green-200 font-bold text-2xl lg:text-3xl">
                        ${featuredRoom.price}
                      </p>
                    </div>
                  </div>

                  {/* Discount Card */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 dark:from-amber-900/30 dark:via-amber-800/20 dark:to-amber-700/30 p-6 border border-amber-200 dark:border-amber-700/50 hover:shadow-lg transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 text-center">
                      <p className="text-amber-700 dark:text-amber-300 font-semibold text-sm lg:text-base mb-2">
                        You Save
                      </p>
                      <p className="text-amber-800 dark:text-amber-200 font-bold text-2xl lg:text-3xl">
                        ${featuredRoom.discount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link
                    href={`/rooms/${featuredRoom.slug.current}`}
                    className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/50 dark:focus:ring-green-400/50"
                  >
                    <span>Explore Details</span>
                    <svg
                      className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoom;
