import HeroSectionSkeleton from "./HeroSection/HeroSectionSkeleton";
import PageSearchSkeleton from "./pageSearch/pageSearchSkeleton";
import FeaturedRoomSkeleton from "./FeaturedRoom/FeaturedRoomSkeleton";
import GallerySkeleton from "./Gallary/GallerySkeleton";

const HomePageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 through-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header spacing - creates space between header and page content */}
      <div className="pt-20 sm:pt-24 lg:pt-28 xl:pt-32" />

      {/* Main content with proper spacing between sections */}
      <div className="space-y-8 sm:space-y-12 lg:space-y-14 xl:space-y-16">
        <HeroSectionSkeleton />
        <PageSearchSkeleton />
        <FeaturedRoomSkeleton />
        <GallerySkeleton />

        {/* Testimonial and NewsLetter are static, no skeleton needed */}
        {/* <Testimonial /> */}
        {/* <NewsLetter /> */}
      </div>

      {/* Footer spacing - creates space between page content and footer */}
      <div className="pb-16 sm:pb-20 lg:pb-24 xl:pb-28" />
    </div>
  );
};

export default HomePageSkeleton;
