const GallerySkeleton = () => {
  // Create an array of 6 skeleton items to match the typical gallery layout
  const skeletonItems = Array.from({ length: 6 }, (_, index) => (
    <div
      key={index}
      className="group cursor-pointer rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 relative"
    >
      {/* Image skeleton */}
      <div className="relative w-full h-64 overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
        </div>

        {/* Price skeleton */}
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3" />
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 pt-20 sm:pt-24 lg:pt-10">
        {/* Header skeleton */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-64 mx-auto mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-96 mx-auto" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {skeletonItems}
        </div>
      </div>
    </div>
  );
};

export default GallerySkeleton;
