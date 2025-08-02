import { Stripe as Stripejs, loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

// Client-side Stripe (for frontend)
let stripePromise: Promise<Stripejs | null>;

export const getStripe = () => {
  if (!stripePromise) {
    // Try NEXT_PUBLIC_ prefix first, then fallback to non-prefixed version
    const publishableKey =
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
      process.env.STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.error(
        "STRIPE_PUBLISHABLE_KEY is not set in environment variables",
      );
      // Return a rejected promise to handle the error gracefully
      return Promise.reject(
        new Error("Stripe publishable key is not configured"),
      );
    }

    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Server-side Stripe (for API routes only)
export const getServerStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-07-30.basil",
  });
};
