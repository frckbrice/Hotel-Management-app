'use client';

import React, { useState } from 'react';
import { Metadata } from 'next';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaCheckCircle,
  FaMap,
} from 'react-icons/fa';
import { BiMap, BiMessageDetail } from 'react-icons/bi';
import { BsTelephoneOutbound } from 'react-icons/bs';
import Image from 'next/image';
// import GoogleMap from "@/components/GoogleMap/GoogleMap"; // Commented out due to expired API key

// export const metadata: Metadata = {
//     title: "Contact Us - Luxury Hotel",
//     description: "Get in touch with us for bookings, inquiries, or any assistance you need.",
// };

// Placeholder Map Component for when Google Maps API key is expired
const PlaceholderMap = () => {
  return (
    <div className='w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10'></div>
      <div className='absolute top-4 left-4 w-12 sm:w-16 h-12 sm:h-16 bg-green-500/20 rounded-full blur-lg'></div>
      <div className='absolute bottom-8 right-8 w-8 sm:w-12 h-8 sm:h-12 bg-blue-500/20 rounded-full blur-md'></div>
      <div className='absolute top-1/2 left-1/3 w-6 sm:w-8 h-6 sm:h-8 bg-yellow-500/20 rounded-full blur-sm animate-pulse'></div>

      {/* Map placeholder content */}
      <div className='relative z-10 h-full flex flex-col'>
        {/* Map Image Section */}
        <div className='flex-1 relative'>
          {/* Static Map Image */}
          <div className='absolute inset-0 bg-gray-200 dark:bg-gray-600 rounded-t-2xl overflow-hidden'>
            <Image
              src='https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/11.502075,3.848033,15,0/600x400?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N2gifQ.rJcFIG214AriISLbB6B5aw'
              alt='Hotel Location Map'
              width={600}
              height={400}
              className='w-full h-full object-cover opacity-70'
              onError={e => {
                // Fallback to a simple map-like background if image fails to load
                e.currentTarget.style.display = 'none';
                (
                  e.currentTarget.nextElementSibling as HTMLElement
                ).style.display = 'block';
              }}
            />
            {/* Fallback Map Pattern */}
            <div className='hidden w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700'>
              <div className='grid grid-cols-8 gap-1 p-4 opacity-30'>
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className='w-2 h-2 bg-gray-500 rounded-sm'></div>
                ))}
              </div>
            </div>
          </div>

          {/* Hotel Marker */}
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='w-6 sm:w-8 h-6 sm:h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center'>
              <div className='w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full'></div>
            </div>
            <div className='absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium text-gray-800 dark:text-white shadow-lg whitespace-nowrap'>
              Luxury Hotel
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-b-2xl'>
          <div className='text-center'>
            <div className='flex items-center justify-center mb-2 sm:mb-3'>
              <FaMap className='text-green-600 dark:text-green-400 text-lg sm:text-xl mr-2' />
              <h3 className='text-base sm:text-lg font-bold text-gray-800 dark:text-white'>
                Luxury Hotel
              </h3>
            </div>

            <div className='space-y-1 sm:space-y-2 text-xs sm:text-sm'>
              <p className='text-gray-700 dark:text-gray-300'>
                123 Luxury Avenue
              </p>
              <p className='text-gray-600 dark:text-gray-400'>
                Yaoundé, Cameroon
              </p>
            </div>

            <div className='mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
              <p className='text-xs text-gray-600 dark:text-gray-400 text-justify mb-1 sm:mb-2'>
                Interactive map temporarily unavailable due to API key
                expiration. Please contact us for directions or visit our
                location at the address above.
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-500 text-justify'>
                Coordinates: 3.848033, 11.502075
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
          });
        }, 3000);
      } else {
        setError(data.error || 'Failed to send message');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      {/* Enhanced Hero Section */}
      <div className='relative h-60 sm:h-72 md:h-80 bg-gradient-to-r from-green-600 via-green-700 to-green-800 overflow-hidden'>
        {/* Animated Background Elements */}
        <div className='absolute inset-0'>
          <div className='absolute top-10 left-10 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-white/10 rounded-full blur-xl animate-pulse'></div>
          <div className='absolute bottom-20 right-20 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-white/5 rounded-full blur-lg animate-bounce'></div>
          <div className='absolute top-1/2 left-1/3 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-green-300/20 rounded-full blur-md animate-ping'></div>
        </div>

        <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10'></div>

        <div className='relative z-10 flex items-center justify-center h-full'>
          <div className='text-center text-white max-w-4xl px-4'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 font-heading animate-fade-in-up'>
              Contact Us
            </h1>
            <p
              className='text-lg sm:text-xl md:text-2xl opacity-90 animate-fade-in-up'
              style={{ animationDelay: '0.2s' }}
            >
              We&apos;d love to hear from you
            </p>
            <div
              className='mt-6 md:mt-8 flex justify-center space-x-2 md:space-x-4 animate-fade-in-up'
              style={{ animationDelay: '0.4s' }}
            >
              <div className='h-1 w-8 sm:w-12 md:w-16 bg-white/60 rounded-full'></div>
              <div className='h-1 w-4 sm:w-6 md:w-8 bg-white/40 rounded-full'></div>
              <div className='h-1 w-2 sm:w-3 md:w-4 bg-white/20 rounded-full'></div>
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div className='absolute bottom-0 left-0 right-0'>
          <svg
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
            className='w-full h-16'
          >
            <path
              d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
              opacity='.25'
              className='fill-green-50 dark:fill-gray-900'
            ></path>
            <path
              d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
              opacity='.5'
              className='fill-green-50 dark:fill-gray-900'
            ></path>
            <path
              d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'
              className='fill-green-50 dark:fill-gray-900'
            ></path>
          </svg>
        </div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative'>
        {/* Floating particles */}
        <div className='fixed inset-0 overflow-hidden pointer-events-none z-0'>
          <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-green-400/30 rounded-full animate-float'></div>
          <div className='absolute top-3/4 right-1/4 w-3 h-3 bg-green-300/20 rounded-full animate-float-delayed'></div>
          <div className='absolute top-1/2 left-3/4 w-1 h-1 bg-green-500/40 rounded-full animate-float-slow'></div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 relative z-10'>
          {/* Enhanced Contact Form */}
          <div className='group'>
            <div className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-white/20 dark:border-gray-700/20 hover:shadow-3xl transition-all duration-500 hover:-translate-y-1'>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0'>
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white font-heading'>
                  Send us a Message
                </h2>
                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500'>
                  <FaPaperPlane className='text-white text-lg sm:text-xl' />
                </div>
              </div>

              {isSubmitted ? (
                <div className='text-center py-16 animate-fade-in'>
                  <FaCheckCircle className='text-6xl text-green-500 mx-auto mb-4 animate-bounce' />
                  <h3 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>
                    Message Sent!
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300'>
                    We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form
                  className='space-y-6 sm:space-y-8'
                  onSubmit={handleSubmit}
                >
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
                    <div className='group/input'>
                      <label
                        htmlFor='firstName'
                        className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 group-focus-within/input:text-green-600 transition-colors'
                      >
                        First Name
                      </label>
                      <div className='relative'>
                        <input
                          type='text'
                          id='firstName'
                          name='firstName'
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className='w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-300 placeholder-gray-400 backdrop-blur-sm hover:border-green-300 dark:hover:border-green-400 text-sm sm:text-base'
                          placeholder='Enter your first name'
                          required
                        />
                        <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg sm:rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                      </div>
                    </div>
                    <div className='group/input'>
                      <label
                        htmlFor='lastName'
                        className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 group-focus-within/input:text-green-600 transition-colors'
                      >
                        Last Name
                      </label>
                      <div className='relative'>
                        <input
                          type='text'
                          id='lastName'
                          name='lastName'
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className='w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-300 placeholder-gray-400 backdrop-blur-sm hover:border-green-300 dark:hover:border-green-400 text-sm sm:text-base'
                          placeholder='Enter your last name'
                          required
                        />
                        <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg sm:rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                      </div>
                    </div>
                  </div>

                  <div className='group/input'>
                    <label
                      htmlFor='email'
                      className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 group-focus-within/input:text-green-600 transition-colors'
                    >
                      Email Address
                    </label>
                    <div className='relative'>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-300 placeholder-gray-400 backdrop-blur-sm hover:border-green-300 dark:hover:border-green-400 text-sm sm:text-base'
                        placeholder='Enter your email address'
                        required
                      />
                      <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg sm:rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                    </div>
                  </div>

                  <div className='group/input'>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 group-focus-within/input:text-green-600 transition-colors'
                    >
                      Phone Number
                    </label>
                    <div className='relative'>
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleInputChange}
                        className='w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-300 placeholder-gray-400 backdrop-blur-sm hover:border-green-300 dark:hover:border-green-400 text-sm sm:text-base'
                        placeholder='Enter your phone number'
                      />
                      <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg sm:rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                    </div>
                  </div>

                  <div className='group/input'>
                    <label
                      htmlFor='subject'
                      className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 group-focus-within/input:text-green-600 transition-colors'
                    >
                      Subject
                    </label>
                    <div className='relative'>
                      <select
                        id='subject'
                        name='subject'
                        value={formData.subject}
                        onChange={handleInputChange}
                        className='w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-300 backdrop-blur-sm hover:border-green-300 dark:hover:border-green-400 text-sm sm:text-base'
                        required
                      >
                        <option value=''>Select a subject</option>
                        <option value='booking'>Booking Inquiry</option>
                        <option value='reservation'>Reservation</option>
                        <option value='general'>General Inquiry</option>
                        <option value='feedback'>Feedback</option>
                        <option value='complaint'>Complaint</option>
                        <option value='other'>Other</option>
                      </select>
                      <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg sm:rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                    </div>
                  </div>

                  <div className='group/input'>
                    <label
                      htmlFor='message'
                      className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 group-focus-within/input:text-green-600 transition-colors'
                    >
                      Message
                    </label>
                    <div className='relative'>
                      <textarea
                        id='message'
                        name='message'
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className='w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all duration-300 resize-none placeholder-gray-400 backdrop-blur-sm hover:border-green-300 dark:hover:border-green-400 text-sm sm:text-base'
                        placeholder='Tell us how we can help you...'
                        required
                      ></textarea>
                      <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg sm:rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                    </div>
                  </div>

                  {error && (
                    <div className='text-center text-red-500 dark:text-red-400 text-sm sm:text-base'>
                      {error}
                    </div>
                  )}

                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='group/btn w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-500 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl disabled:cursor-not-allowed disabled:transform-none overflow-hidden relative text-sm sm:text-base'
                  >
                    <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000'></div>
                    <span className='relative z-10 flex items-center justify-center space-x-2 sm:space-x-3'>
                      {isSubmitting ? (
                        <>
                          <div className='w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <FaPaperPlane className='group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300' />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Enhanced Contact Information */}
          <div className='space-y-8'>
            {/* Hotel Info */}
            <div className='group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-3xl transition-all duration-500 hover:-translate-y-1'>
              <div className='flex items-center justify-between mb-8'>
                <h2 className='text-3xl font-bold text-gray-800 dark:text-white font-heading'>
                  Get in Touch
                </h2>
                <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
              </div>
              <div className='space-y-8'>
                {[
                  {
                    icon: BiMap,
                    title: 'Address',
                    content: ['123 Road, Avom'],
                  },
                  {
                    icon: BsTelephoneOutbound,
                    title: 'Phone',
                    content: ['674-852-304'],
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className='group/item flex items-start space-x-4 sm:space-x-6 p-3 sm:p-4 rounded-2xl hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all duration-300'
                  >
                    <div className='flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300 shadow-lg'>
                      <item.icon className='text-green-600 dark:text-green-400 text-lg sm:text-2xl' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors'>
                        {item.title}
                      </h3>
                      <div className='space-y-1'>
                        {item.title === 'Portfolio' ? (
                          <a
                            href='https://maebrieporfolio.vercel.app/'
                            target='_blank'
                            className='text-transparent bg-clip-text hover:underline inline-flex items-center group/link text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base break-words'
                          >
                            Check my work
                            <svg
                              className='ml-1 w-3 h-3 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </a>
                        ) : (
                          item.content.map((line, i) => (
                            <p
                              key={i}
                              className='text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base break-words'
                            >
                              {line}
                            </p>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Social Media */}
            <div className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-3xl transition-all duration-500'>
              <h3 className='text-2xl font-bold mb-8 text-gray-800 dark:text-white font-heading text-center'>
                Follow Our Journey
              </h3>
              <div className='flex justify-center space-x-6'>
                {[
                  {
                    icon: FaFacebook,
                    color: 'from-blue-600 to-blue-700',
                    hoverColor: 'hover:from-blue-700 hover:to-blue-800',
                  },
                  {
                    icon: FaTwitter,
                    color: 'from-sky-500 to-sky-600',
                    hoverColor: 'hover:from-sky-600 hover:to-sky-700',
                  },
                  {
                    icon: FaInstagram,
                    color: 'from-pink-600 to-pink-700',
                    hoverColor: 'hover:from-pink-700 hover:to-pink-800',
                  },
                  {
                    icon: FaLinkedin,
                    color: 'from-blue-700 to-blue-800',
                    hoverColor: 'hover:from-blue-800 hover:to-blue-900',
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href='#'
                    className={`group/social relative w-16 h-16 bg-gradient-to-br ${social.color} ${social.hoverColor} rounded-2xl flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-2xl overflow-hidden`}
                  >
                    <div className='absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover/social:opacity-100 transition-opacity duration-300'></div>
                    <social.icon className='text-2xl relative z-10 group-hover/social:scale-110 transition-transform duration-300' />
                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-white/30 to-transparent rounded-full opacity-0 group-hover/social:opacity-100 transition-opacity duration-300'></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Enhanced Emergency Contact */}
            <div className='relative bg-gradient-to-br from-red-300 via-red-400 to-red-400 rounded-3xl shadow-2xl p-8 text-white overflow-hidden group hover:shadow-3xl transition-all duration-500'>
              <div className='absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent'></div>
              <div className='absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl'></div>
              <div className='absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg'></div>

              <div className='relative z-10'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-2xl font-bold font-heading'>
                    Emergency Contact
                  </h3>
                  <div className='w-4 h-4 bg-red-200 rounded-full animate-pulse'></div>
                </div>
                <p className='mb-6 opacity-90 text-lg'>
                  For urgent matters outside business hours
                </p>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-3 sm:space-x-4 p-3 bg-white/10 rounded-xl backdrop-blur-sm'>
                    <FaPhone className='text-red-200 text-lg sm:text-xl flex-shrink-0' />
                    <span className='font-semibold text-sm sm:text-base break-words'>
                      Emergency: +237 999 888 777
                    </span>
                  </div>
                  <div className='flex items-center space-x-3 sm:space-x-4 p-3 bg-white/10 rounded-xl backdrop-blur-sm'>
                    <FaEnvelope className='text-red-200 text-lg sm:text-xl flex-shrink-0' />
                    <span className='font-semibold text-sm sm:text-base break-words'>
                      emergency@luxuryhotel.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Map Section */}
        <div className='mt-20'>
          <div className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20 dark:border-gray-700/20 hover:shadow-3xl transition-all duration-500'>
            <h2 className='text-4xl font-bold mb-10 text-gray-800 dark:text-white font-heading text-center'>
              Find Us
            </h2>
            <div className='relative overflow-hidden rounded-2xl'>
              <PlaceholderMap />
            </div>
          </div>
        </div>

        <style jsx>
          {`
            @keyframes fade-in-up {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes float {
              0%,
              100% {
                transform: translateY(0px) rotate(0deg);
              }
              50% {
                transform: translateY(-20px) rotate(180deg);
              }
            }

            @keyframes float-delayed {
              0%,
              100% {
                transform: translateY(0px) rotate(0deg);
              }
              50% {
                transform: translateY(-20px) rotate(180deg);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ContactPage;
