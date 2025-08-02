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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-10">
      <HeroSection />
      <PageSearch />
      {featuredRoom && <FeaturedRoom featuredRoom={featuredRoom} />}
      <div />
      <Gallery />
      <Testimonial />
      <NewsLetter />
    </div>
  );
};

export default Home;
