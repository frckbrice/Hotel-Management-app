import Link from "next/link";
import React from "react";
import {
  BsFillSendFill,
  BsTelephoneOutbound,
  BsInstagram,
  BsTwitter,
  BsFacebook,
  BsLinkedin,
  BsArrowUpRight,
} from "react-icons/bs";
import {
  BiMessageDetail,
  BiMap,
  BiPhone,
  BiEnvelope,
  BiHeart,
} from "react-icons/bi";
import {
  FaHotel,
  FaUtensils,
  FaSpa,
  FaDumbbell,
  FaSwimmingPool,
  FaCalendarAlt,
} from "react-icons/fa";

type Props = {};

const Footer = (props: Props) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "Our story", href: "/about" },
      { name: "Get in touch", href: "/contact" },
      { name: "Our privacy commitment", href: "/privacy" },
      { name: "Terms of service", href: "/terms" },
      { name: "Customer Assistance", href: "/support" },
    ],
    services: [
      { name: "Dining Experience", href: "/dining", icon: FaUtensils },
      { name: "Wellness", href: "/wellness", icon: FaSpa },
      { name: "Fitness", href: "/fitness", icon: FaDumbbell },
      { name: "Swimming Pool", href: "/pool", icon: FaSwimmingPool },
      { name: "Events", href: "/events", icon: FaCalendarAlt },
    ],
    social: [
      {
        name: "Facebook",
        href: "#",
        icon: BsFacebook,
        color: "hover:text-blue-600",
      },
      {
        name: "Twitter",
        href: "#",
        icon: BsTwitter,
        color: "hover:text-sky-500",
      },
      {
        name: "Instagram",
        href: "#",
        icon: BsInstagram,
        color: "hover:text-pink-600",
      },
      {
        name: "LinkedIn",
        href: "#",
        icon: BsLinkedin,
        color: "hover:text-blue-700",
      },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mt-20 overflow-hidden pb-8 sm:pb-0">
      {/* Removed decorative top border to fix dark mode black line issue */}

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/3 to-pink-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Link
            href="/"
            className="inline-block font-black text-4xl md:text-5xl mb-4 hover:scale-105 transition-transform duration-300 mt-10 text-green-700 dark:text-green-400"
          >
            HotelMT
          </Link>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed text-justify">
            Experience luxury and comfort at its finest. Your perfect getaway
            awaits with world-class amenities and exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-gradient-to-br from-green-500 to-green-600">
                <BiPhone className="text-white text-lg" />
              </div>
              <h4 className="font-bold text-xl text-gray-800 dark:text-white">
                Contact
              </h4>
            </div>

            <div className="space-y-6">
              <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BiMap className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    Address
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    123 Road, Avom
                  </p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BsTelephoneOutbound className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    Phone
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    674-852-304
                  </p>
                </div>
              </div>

              <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BiMessageDetail className="text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    Portfolio
                  </p>
                  <Link
                    href="https://maebrieporfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:underline inline-flex items-center group/link transition-colors duration-300"
                  >
                    Check my work
                    <BsArrowUpRight className="ml-1 w-3 h-3 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-xl text-gray-800 dark:text-white mb-8 flex items-center">
              <FaHotel className="mr-3 text-gray-600 dark:text-gray-400" />
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all duration-300 py-2"
                  >
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.name}
                    </span>
                    <BsArrowUpRight className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-xl text-gray-800 dark:text-white mb-8 flex items-center">
              <FaUtensils className="mr-3 text-gray-600 dark:text-gray-400" />
              Services
            </h4>
            <ul className="space-y-4">
              {footerLinks.services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all duration-300 py-2"
                  >
                    <service.icon className="mr-3 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-xl text-gray-800 dark:text-white mb-8">
              Stay Connected
            </h4>

            {/* Newsletter Signup */}
            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Subscribe to our newsletter for exclusive offers and updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm"
                />
                <button className="px-6 py-3 rounded-r-xl text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <BsFillSendFill className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Follow us on social media
              </p>
              <div className="flex space-x-4">
                {footerLinks.social.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className={`group w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg`}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 sm:pt-8 pb-4 sm:pb-0">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              <span>© {currentYear} HotelMT. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Made with</span>
              <BiHeart className="text-red-500 w-4 h-4 animate-pulse hidden md:inline" />
              <span className="hidden md:inline">in Cameroon</span>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <Link
                href="/privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Removed decorative bottom wave to fix dark mode styling issues */}
    </footer>
  );
};

export default Footer;
