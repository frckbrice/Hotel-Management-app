import FeaturedRoom from "@/components/pages/home/FeaturedRoom/FeaturedRoom";
import Gallery from "@/components/pages/home/Gallary/Gallary";
import HeroSection from "@/components/pages/home/HeroSection/HeroSection";
import NewsLetter from "@/components/pages/home/NewsLetter/NewsLetter";
import PageSearch from "@/components/pages/home/pageSearch/pageSearch";
import Testimonial from "@/components/pages/home/testimonial";
import { getFeaturedRoom } from "@/libs/apis";

const Home = async () => {
  let featuredRoom = null;

  try {
    featuredRoom = await getFeaturedRoom();
  } catch (error) {
    console.error("Error fetching featured room:", error);
    // Continue without featured room if there's an error
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 through-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header spacing - creates space between header and page content */}
      <div className="pt-20 sm:pt-24 lg:pt-28 xl:pt-32" />

      {/* Main content with proper spacing between sections */}
      <div className="space-y-8 sm:space-y-12 lg:space-y-14 xl:space-y-16">
        <HeroSection />
        <PageSearch />
        {featuredRoom && <FeaturedRoom featuredRoom={featuredRoom} />}
        <Gallery />
        <Testimonial />
        <NewsLetter />
      </div>

      {/* Footer spacing - creates space between page content and footer */}
      <div className="pb-16 sm:pb-20 lg:pb-24 xl:pb-28" />
    </div>
  );
};

export default Home;
