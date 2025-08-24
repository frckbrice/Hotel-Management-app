const GallerySkeleton = () => {
  const skeletonItems = Array.from({ length: 8 }, (_, index) => (
    <div key={index} className="group relative h-full animate-pulse">
      {/* Main Card Skeleton */}
      <div className="relative overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-700 shadow-xl border border-gray-200 dark:border-gray-600 h-full flex flex-col">
        {/* Image Container Skeleton */}
        <div className="relative aspect-[4/5] overflow-hidden flex-shrink-0 bg-gray-300 dark:bg-gray-600">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>

        {/* Card Content Skeleton */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title Skeleton */}
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2" />

          {/* Description Skeleton */}
          <div className="space-y-2 mb-4 flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
          </div>

          {/* Button Skeleton */}
          <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded-xl w-full" />
        </div>
      </div>
    </div>
  ));

  return (
    <section className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header Skeleton */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24" />
              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mx-auto mb-6" />
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto mb-8" />

          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-600" />
            <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600" />
            <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-600" />
          </div>
        </div>

        {/* Gallery Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {skeletonItems}
        </div>

        {/* Call to Action Skeleton */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-8 py-4 bg-gray-300 dark:bg-gray-600 rounded-2xl w-48 h-14" />
        </div>
      </div>
    </section>
  );
};

export default GallerySkeleton;
