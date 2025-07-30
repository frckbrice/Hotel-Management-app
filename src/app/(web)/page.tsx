import FeaturedRoom from "@/components/FeaturedRoom/FeaturedRoom";
import Gallery from "@/components/Gallary/Gallary";
import HeroSection from "@/components/HeroSection/HeroSection";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import PageSearch from "@/components/pageSearch/pageSearch";
import Testimonial from "@/components/testimonial";
import { getFeaturedRoom } from "@/libs/apis";

const Home = async () => {
  const featuredRoom = await getFeaturedRoom();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-10">
      <HeroSection />
      <PageSearch />
      <div className="my-10">
        <FeaturedRoom featuredRoom={featuredRoom} />
      </div>

      <div className="my-10">
        <Gallery />
      </div>
      <Testimonial />
      <NewsLetter />
    </div>
  );
};

export default Home;
