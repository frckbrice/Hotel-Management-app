const UserDetailsSkeleton = () => {
  return (
    <div className="min-h-screen p-10">
      <div className="container mx-auto px-2 md:px-4 py-10">
        <div className="grid grid-cols-12 gap-10">
          {/* Left Sidebar Skeleton */}
          <div className="hidden md:block col-span-4 lg:col-span-3 sticky top-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6">
            {/* Profile Image Skeleton */}
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-600 shadow-lg bg-gray-300 dark:bg-gray-600 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>

            {/* About Section Skeleton */}
            <div className="text-center flex flex-col items-center justify-center space-y-3">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse" />
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full animate-pulse" />
            </div>

            {/* Username/Name Skeleton */}
            <div className="text-center space-y-2">
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-24 mx-auto animate-pulse" />
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mx-auto animate-pulse" />
            </div>

            {/* Join Date Skeleton */}
            <div className="text-center">
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20 mx-auto animate-pulse" />
            </div>

            {/* Sign Out Button Skeleton */}
            <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse" />
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="md:col-span-8 lg:col-span-9">
            {/* Header Skeleton */}
            <div className="flex items-center mb-6">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-32 mr-3 animate-pulse" />
            </div>

            {/* Mobile Avatar Skeleton */}
            <div className="md:hidden w-14 h-14 rounded-l-full overflow-hidden bg-gray-300 dark:bg-gray-600 animate-pulse mb-4" />

            {/* Mobile About Skeleton */}
            <div className="block w-fit md:hidden space-y-2 mb-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48 animate-pulse" />
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse" />
            </div>

            {/* Mobile Sign Out Skeleton */}
            <div className="md:hidden flex items-center my-2">
              <div className="mr-2 h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse" />
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-6 animate-pulse" />
            </div>

            {/* Navigation Skeleton */}
            <nav className="sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb-8 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-lg mt-7">
              <div className="flex space-x-8">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32 animate-pulse" />
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-28 animate-pulse" />
              </div>
            </nav>

            {/* Content Area Skeleton */}
            <div className="space-y-6">
              {/* Table Skeleton */}
              <div className="overflow-auto max-w-[340px] rounded-lg mx-auto md:max-w-full shadow-lg sm:rounded-lg bg-white dark:bg-gray-800">
                <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  {/* Table Header Skeleton */}
                  <div className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
                    <div className="px-6 py-3">
                      <div className="grid grid-cols-7 gap-4">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12 animate-pulse" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Table Body Skeleton */}
                  <div className="space-y-4 p-6">
                    {Array.from({ length: 3 }, (_, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-7 gap-4 items-center"
                      >
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12 animate-pulse" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chart Skeleton */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-6 animate-pulse" />
                <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsSkeleton;
