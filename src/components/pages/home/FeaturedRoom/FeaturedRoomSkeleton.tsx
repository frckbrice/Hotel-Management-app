const FeaturedRoomSkeleton = () => {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header Skeleton */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-48 mx-auto mb-4 animate-pulse" />
          <div className="w-24 h-1 bg-gray-300 dark:bg-gray-600 mx-auto rounded-full animate-pulse" />
        </div>

        {/* Main Content Card Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row">
            {/* Image Gallery Section Skeleton */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8">
              <div className="space-y-4 lg:space-y-6">
                {/* Main Image Skeleton */}
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="aspect-[4/3] bg-gray-300 dark:bg-gray-600 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>

                {/* Thumbnail Grid Skeleton */}
                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  {Array.from({ length: 2 }, (_, index) => (
                    <div
                      key={index}
                      className="relative rounded-xl overflow-hidden"
                    >
                      <div className="aspect-[4/3] bg-gray-300 dark:bg-gray-600 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Section Skeleton */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
              <div className="space-y-6 lg:space-y-8">
                {/* Room Name Skeleton */}
                <div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4 animate-pulse" />
                  <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600 animate-pulse" />
                </div>

                {/* Description Skeleton */}
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 animate-pulse" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5 animate-pulse" />
                </div>

                {/* Pricing Cards Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  {/* Price Card Skeleton */}
                  <div className="relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700 p-6 border border-gray-300 dark:border-gray-600">
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mx-auto animate-pulse" />
                      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20 mx-auto animate-pulse" />
                    </div>
                  </div>

                  {/* Features Card Skeleton */}
                  <div className="relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700 p-6 border border-gray-300 dark:border-gray-600">
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 mx-auto animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full animate-pulse" />
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-4/5 animate-pulse" />
                        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Button Skeleton */}
                <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl w-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRoomSkeleton;
