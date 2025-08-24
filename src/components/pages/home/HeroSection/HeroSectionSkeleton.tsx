const HeroSectionSkeleton = () => {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content Skeleton */}
          <div className="space-y-8">
            {/* Main Heading Skeleton */}
            <div className="space-y-4">
              <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-3/4 animate-pulse" />
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-2/3 animate-pulse" />
            </div>

            {/* Description Skeleton */}
            <div className="space-y-3">
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-full animate-pulse" />
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-5/6 animate-pulse" />
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-4/5 animate-pulse" />
            </div>

            {/* Button Skeleton */}
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl w-32 animate-pulse" />
          </div>

          {/* Right Images Skeleton */}
          <div className="space-y-6">
            {/* Main Image Skeleton */}
            <div className="rounded-2xl overflow-hidden h-60 bg-gray-300 dark:bg-gray-600 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>

            {/* Two Smaller Images Skeleton */}
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl overflow-hidden h-48 bg-gray-300 dark:bg-gray-600 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
              <div className="rounded-2xl overflow-hidden h-48 bg-gray-300 dark:bg-gray-600 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionSkeleton;
