"use client";

import React, { useState, useTransition } from "react";
import {
  FaEnvelope,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { toast } from "sonner";

// Custom Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="relative">
      {/* Outer ring */}
      <div className="w-6 h-6 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
      {/* Inner dot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-600 rounded-full"></div>
    </div>
    <span className="ml-3 text-green-600 font-medium">Subscribing...</span>
  </div>
);

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Use useTransition for better UX
    startTransition(async () => {
      try {
        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(data.message);
          setIsSubmitted(true);
          setEmail("");

          // Show success toast
          toast.success("Successfully subscribed to newsletter!", {
            duration: 5000,
            position: "bottom-right",
          });

          // Reset form after 5 seconds
          setTimeout(() => {
            setIsSubmitted(false);
            setSuccess("");
          }, 5000);
        } else {
          const errorMessage =
            data.error || "Failed to subscribe. Please try again.";
          setError(errorMessage);

          // Show error toast
          toast.error(errorMessage, {
            duration: 5000,
            position: "bottom-right",
          });
        }
      } catch (error) {
        const errorMessage = "Network error. Please try again.";
        setError(errorMessage);

        // Show error toast
        toast.error(errorMessage, {
          duration: 5000,
          position: "bottom-right",
        });
      }
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (error) setError("");
  };

  if (isSubmitted) {
    return (
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white px-4 sm:px-6 lg:px-8 rounded-xl md:rounded-[30px] flex flex-col justify-center items-center py-8 md:py-16 lg:py-24 shadow-xl mt-10">
          <div className="text-center">
            <FaCheckCircle className="text-6xl text-green-300 mx-auto mb-6 animate-bounce" />
            <h6 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center mb-4">
              Thank You for Subscribing!
            </h6>
            <p className="text-green-100 text-base sm:text-lg md:text-xl text-center mb-6 max-w-2xl">
              {success}
            </p>
            <p className="text-green-200 text-sm sm:text-base text-center">
              We&apos;ll send you exclusive offers and updates soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className={`bg-gradient-to-r from-green-600 to-green-800 text-white px-4 sm:px-6 lg:px-8 rounded-xl md:rounded-[30px] flex flex-col justify-center items-center py-8 md:py-16 lg:py-24 shadow-xl mt-10 transition-all duration-300 ${isPending ? "opacity-95 scale-[0.99] shadow-2xl" : ""} relative overflow-hidden w-full max-w-4xl`}
      >
        <p className="font-semibold text-base sm:text-lg md:text-xl text-center mb-3">
          Explore More About Our Hotel
        </p>
        <h6 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center mb-6">
          Sign Up for Our Newsletter
        </h6>
        {/* Form content with loading animation */}
        <div
          className={`w-full max-w-2xl transition-all duration-300 ${isPending ? "animate-pulse" : ""}`}
        >
          {/* Error Message */}
          {error && (
            <div className="w-full max-w-md mx-auto mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl flex items-center space-x-3">
              <FaExclamationTriangle className="text-red-300 flex-shrink-0" />
              <span className="text-red-100 text-sm">{error}</span>
            </div>
          )}
          {/* Success Message */}
          {success && (
            <div className="w-full max-w-md mx-auto mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl flex items-center space-x-3">
              <FaCheckCircle className="text-green-300 flex-shrink-0" />
              <span className="text-green-100 text-sm">{success}</span>
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-center items-center w-full pt-4 md:pt-8 gap-4 sm:gap-6 max-w-2xl">
            <div className="relative flex-1 max-w-md">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-300 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                disabled={isPending}
                className="bg-green-700 h-11 md:h-14 lg:h-16 rounded-xl pl-12 md:pl-14 w-full text-white placeholder:text-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent border border-green-600 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              disabled={isPending || !email.trim()}
              className={`bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-400 disabled:to-gray-500 text-gray-900 font-semibold px-6 py-3 md:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base disabled:cursor-not-allowed disabled:transform-none min-w-[120px] flex items-center justify-center ${isPending ? "animate-pulse shadow-2xl" : ""}`}
            >
              {isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium">Subscribing...</span>
                </div>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>{" "}
          {/* Close the flex container div */}
          <p className="text-green-200 text-xs sm:text-sm text-center mt-6 max-w-md mx-auto">
            By subscribing, you agree to receive marketing emails from HotelMT.
            You can unsubscribe at any time.
          </p>
        </div>{" "}
        {/* Close the form content div */}
      </form>
    </section>
  );
};

export default NewsLetter;
