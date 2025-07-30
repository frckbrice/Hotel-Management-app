'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Gallery = () => {
  const router = useRouter();
  const featuredImages = [
    { src: '/images/alen.jpg', alt: 'Portrait by Alen' },
    { src: '/images/alexander.jpg', alt: 'Portrait by Alexander' },
    { src: '/images/jacquesbopp.jpg', alt: 'Portrait by Jacques Bopp' },
    { src: '/images/roberto1.jpg', alt: 'Portrait by Roberto' },
  ];

  return (
    <section className='py-16 px-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl mx-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Title Section */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl md:text-5xl font-bold font-heading mb-4'>
            View our gallery
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full'></div>
        </div>

        {/* Gallery Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
          {featuredImages.map((image, index) => (
            <div
              key={index}
              className='group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2'
            >
              {/* Background Gradient */}
              <div className='absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'></div>

              {/* Image Container */}
              <div className='relative aspect-square overflow-hidden'>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className='object-cover transition-transform duration-700 group-hover:scale-110'
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                />

                {/* Overlay */}
                <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20'></div>

                {/* Hover Content */}
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30'>
                  <div className='bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300'>
                    <svg
                      className='w-6 h-6 text-gray-800'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left'></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className='text-center mt-12'>
          <button
            onClick={() => router.push('/gallery')}
            className='inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-full hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
          >
            View Full Gallery
            <svg
              className='ml-2 w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
