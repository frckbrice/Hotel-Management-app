import { getRooms } from '@/libs/apis';
import SingleRoom from '@/components/Gallary/SingleRoom';
import { Room } from '@/components/models/room';

const GalleryPage = async () => {
  const rooms = await getRooms();

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 pt-20 sm:pt-24 lg:pt-10'>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 lg:mb-10 font-heading'>
          Our Gallery
        </h1>
        <p className='text-center text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto'>
          Discover the beauty and luxury of our hotel through our curated
          gallery.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
          {rooms.map((room: Room) => (
            <SingleRoom key={room._id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
