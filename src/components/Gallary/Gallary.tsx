'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Gallery = () => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const featuredImages = [
    { src: '/images/alen.jpg', alt: 'Luxury Suite Interior' },
    { src: '/images/alexander.jpg', alt: 'Premium Room View' },
    { src: '/images/jacquesbopp.jpg', alt: 'Executive Suite Bedroom' },
    { src: '/images/roberto1.jpg', alt: 'Deluxe Room Amenities' },
  ];

  return (
    <section className='w-full'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
        {/* Section Header */}
        <div className='text-center mb-12 lg:mb-16'>
          <div className='inline-flex items-center justify-center mb-6'>
            <div className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse'></div>
              <span className='text-green-600 dark:text-green-400 font-medium text-sm uppercase tracking-wider'>
                Our Collection
              </span>
              <div className='w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse'></div>
            </div>
          </div>

          <h2 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-6'>
            Luxury Rooms & Suites
          </h2>

          <p className='text-gray-600 dark:text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto mb-8'>
            Experience the elegance and comfort of our meticulously designed
            accommodations
          </p>

          <div className='flex items-center justify-center space-x-2'>
            <div className='w-12 h-0.5 bg-gradient-to-r from-transparent to-green-500 dark:to-green-400'></div>
            <div className='w-8 h-0.5 bg-green-500 dark:bg-green-400'></div>
            <div className='w-12 h-0.5 bg-gradient-to-l from-transparent to-green-500 dark:to-green-400'></div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16'>
          {featuredImages.map((image, index) => (
            <div
              key={index}
              className='group relative'
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Main Card */}
              <div className='relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:rotate-1 border border-gray-200 dark:border-gray-700'>
                {/* Image Container */}
                <div className='relative aspect-[4/5] overflow-hidden'>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className='object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110'
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                    priority={index < 2}
                  />

                  {/* Gradient Overlays */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                  <div className='absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>

                  {/* Hover Content */}
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500'>
                    <div className='bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl p-4 transform scale-75 group-hover:scale-100 transition-all duration-500 shadow-2xl border border-white/20'>
                      <div className='flex items-center space-x-3'>
                        <div className='p-2 bg-green-500 dark:bg-green-400 rounded-full'>
                          <svg
                            className='w-5 h-5 text-white dark:text-gray-900'
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
                        <span className='text-gray-900 dark:text-white font-medium'>
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Border */}
                <div className='absolute inset-0 border-2 border-transparent group-hover:border-green-500/50 dark:group-hover:border-green-400/50 rounded-3xl transition-all duration-500'></div>

                {/* Bottom Accent Line */}
                <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-green-600 to-green-500 dark:from-green-400 dark:via-green-500 dark:to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center rounded-b-3xl'></div>
              </div>

              {/* Floating Elements */}
              <div
                className={`absolute -top-2 -right-2 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full transform transition-all duration-500 ${hoveredIndex === index ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
              ></div>
              <div
                className={`absolute -bottom-2 -left-2 w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full transform transition-all duration-700 delay-100 ${hoveredIndex === index ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
              ></div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16'>
          {[
            { number: '120+', label: 'Luxury Rooms' },
            { number: '15+', label: 'Premium Suites' },
            { number: '5★', label: 'Hotel Rating' },
            { number: '98%', label: 'Guest Satisfaction' },
          ].map((stat, index) => (
            <div
              key={index}
              className='text-center group hover:scale-105 transition-transform duration-300'
            >
              <div className='bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-green-500/50 dark:hover:border-green-400/50 transition-all duration-300'>
                <div className='text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400 mb-2'>
                  {stat.number}
                </div>
                <div className='text-gray-600 dark:text-gray-300 font-medium'>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className='text-center'>
          <div className='inline-flex flex-col items-center gap-4'>
            <button
              onClick={() => router.push('/gallery')}
              className='group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 via-green-700 to-green-600 dark:from-green-500 dark:via-green-600 dark:to-green-500 text-white font-semibold rounded-2xl hover:from-green-700 hover:via-green-800 hover:to-green-700 dark:hover:from-green-600 dark:hover:via-green-700 dark:hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-500/50 dark:focus:ring-green-400/50 overflow-hidden'
            >
              <div className='absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
              <span className='relative z-10 text-lg'>View All Rooms</span>
              <svg
                className='relative z-10 ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300'
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

            <p className='text-gray-500 dark:text-gray-400 text-sm mt-4 max-w-md mx-auto'>
              Discover our complete collection of luxury accommodations and find
              your perfect stay
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
