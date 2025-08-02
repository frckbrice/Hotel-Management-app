import Image from 'next/image';

export const heading1 = (
  <>
    {' '}
    <h1 className='font-heading mb-4 lg:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl'>
      {' '}
      Explore Our Exquisite Hotel
    </h1>
    <p className='text-gray-700 dark:text-gray-300 mb-8 lg:mb-12 max-w-lg text-base sm:text-lg text-justify'>
      Experience an Exquisite Hotel Immersed in Rich History and Timeless
      Elegance.
    </p>
    <button className='btn-primary text-sm sm:text-base px-6 py-3 lg:px-8 lg:py-4'>
      {' '}
      Get Started
    </button>
  </>
);

export const section2 = (
  <>
    <div className='grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1'>
      <div className='rounded-2xl overflow-hidden h-32 sm:h-40 lg:h-48'>
        <Image
          src='/images/jacquesbopp.jpg'
          alt='vecteezy_garden-in-hotel-'
          width={300}
          height={300}
          className='img scale-animation w-full h-full object-cover'
        />
      </div>
      <div className='grid h-32 sm:h-40 lg:h-48 gap-4 sm:gap-6 lg:gap-8 grid-cols-2'>
        <div className='rounded-2xl overflow-hidden'>
          <Image
            src='/images/michaeloxendine.jpg'
            alt='mateo-fernandez'
            width={300}
            height={300}
            className='img scale-animation w-full h-full object-cover'
          />
        </div>
        <div className='rounded-2xl overflow-hidden'>
          <Image
            src='/images/visualsofdana.jpg'
            alt='linus-mimietz'
            width={300}
            height={300}
            className='img scale-animation w-full h-full object-cover'
          />
        </div>
      </div>
    </div>
  </>
);
