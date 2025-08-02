// 'use client';

// import React from 'react';
// import { USERS } from '@/lib/constants';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { CardDescription, CardTitle } from '@/components/ui/card';
// import { TitleSection } from "./title-section";
// import CustomCard from "./custom-card";

// const Testimonial = () => {
//     return (
//         <section id="testimonials" className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
//             {/* Background effect */}
//             <div className="w-full blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/50 -z-10 top-56" />

//             <div className="container px-4 mx-auto">
//                 <TitleSection
//                     title="Guest Experiences"
//                     subHeading="Hear what our valued guests have to say about their stays with us."
//                     pill="Testimonials"
//                 />

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
//                     {USERS.slice(0, 6).map((testimonial, index) => (
//                         <div
//                             key={index}
//                             className={`relative hover:scale-105 transition-transform duration-300 ${index % 2 === 0 ? 'animate-bounce-even' : 'animate-bounce-odd'
//                                 }`}
//                             style={{
//                                 animationDuration: '6s',
//                                 animationDelay: `${index * 0.3}s`
//                             }}
//                         >
//                             <CustomCard
//                                 className="w-full h-full rounded-xl dark:bg-gradient-to-t dark:from-border dark:to-background shadow-lg hover:shadow-xl"
//                                 cardHeader={
//                                     <div className="flex items-center gap-4">
//                                         <Avatar>
//                                             <AvatarImage src={`/avatars/${index + 1}.png`} />
//                                             <AvatarFallback>AV</AvatarFallback>
//                                         </Avatar>
//                                         <div>
//                                             <CardTitle className="text-foreground">
//                                                 {testimonial.name}
//                                             </CardTitle>
//                                             <CardDescription className="dark:text-washed-purple-800">
//                                                 {testimonial.location}
//                                             </CardDescription>
//                                         </div>
//                                     </div>
//                                 }
//                                 cardContent={
//                                     <p className="dark:text-washed-purple-800">
//                                         {testimonial.message}
//                                     </p>
//                                 }
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Add this style tag for the animations */}
//             <style jsx global>{`
//                 @keyframes bounce-even {
//                     0%, 100% { transform: translateY(0); }
//                     50% { transform: translateY(-20px); }
//                 }
//                 @keyframes bounce-odd {
//                     0%, 100% { transform: translateY(0); }
//                     50% { transform: translateY(20px); }
//                 }
//                 .animate-bounce-even {
//                     animation: bounce-even infinite ease-in-out;
//                 }
//                 .animate-bounce-odd {
//                     animation: bounce-odd infinite ease-in-out;
//                 }
//             `}</style>
//         </section>
//     )
// }

// export default Testimonial;

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { USERS } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { TitleSection } from './title-section';
import CustomCard from './custom-card';

const Testimonial = () => {
  const [activeSetIndex, setActiveSetIndex] = useState(0);

  // Memoize the testimonial sets to prevent recreation on every render
  const testimonialSets = useMemo(() => {
    const sets: (typeof USERS)[] = [];
    for (let i = 0; i < USERS.length; i += 6) {
      const set = USERS.slice(i, i + 6);
      // Fill incomplete sets with testimonials from the beginning
      while (set.length < 6) {
        set.push(USERS[set.length % USERS.length]);
      }
      sets.push(set);
    }
    return sets;
  }, []);

  const displayedTestimonials = testimonialSets[activeSetIndex] || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSetIndex(prev => (prev + 1) % testimonialSets.length);
    }, 8000); // Rotate every 8 seconds

    return () => clearInterval(interval);
  }, [testimonialSets.length]); // Only depend on length which is stable

  return (
    <section
      id='testimonials'
      className='relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950'
    >
      {/* Background effect */}
      <div className='w-full blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/50 -z-10 top-56' />

      <div className='container px-4 mx-auto'>
        <TitleSection
          title='Guest Experiences'
          subHeading='Hear what our valued guests have to say about their stays with us.'
          pill='Testimonials'
        />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
          {displayedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}-${activeSetIndex}`}
              className={`relative hover:scale-105 transition-all duration-300 ${
                index % 2 === 0 ? 'animate-bounce-even' : 'animate-bounce-odd'
              }`}
              style={{
                animationDuration: '6s',
                animationDelay: `${index * 0.3}s`,
              }}
            >
              <CustomCard
                className='w-full h-full rounded-xl dark:bg-gradient-to-t dark:from-border dark:to-background shadow-lg hover:shadow-xl transition-opacity duration-1000'
                cardHeader={
                  <div className='flex items-center gap-4'>
                    <Avatar>
                      <AvatarImage
                        src={`/avatars/${((activeSetIndex * 6 + index) % USERS.length) + 1}.png`}
                      />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className='text-foreground'>
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className='dark:text-washed-purple-800'>
                        {testimonial.location}
                      </CardDescription>
                    </div>
                  </div>
                }
                cardContent={
                  <p className='dark:text-washed-purple-800'>
                    {testimonial.message}
                  </p>
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes bounce-even {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes bounce-odd {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(20px);
          }
        }
        .animate-bounce-even {
          animation: bounce-even infinite ease-in-out;
        }
        .animate-bounce-odd {
          animation: bounce-odd infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Testimonial;
