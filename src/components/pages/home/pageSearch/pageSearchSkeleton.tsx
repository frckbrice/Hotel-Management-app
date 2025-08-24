const PageSearchSkeleton = () => {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header Skeleton */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-64 mx-auto mb-4 animate-pulse" />
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-96 mx-auto animate-pulse" />
        </div>

        {/* Search Form Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 lg:p-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Destination Input Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse" />
              <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl w-full animate-pulse" />
            </div>

            {/* Check-in Date Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse" />
              <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl w-full animate-pulse" />
            </div>

            {/* Check-out Date Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse" />
              <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl w-full animate-pulse" />
            </div>

            {/* Search Button Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-transparent rounded w-0 animate-pulse" />
              <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl w-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Quick Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-16 mx-auto animate-pulse" />
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-24 mx-auto animate-pulse" />
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mx-auto animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PageSearchSkeleton;
