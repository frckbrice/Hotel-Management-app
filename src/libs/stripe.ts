import { Stripe as Stripejs, loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Client-side Stripe (for frontend)
let stripePromise: Promise<Stripejs | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as string
    );
  }
  return stripePromise;
};

// Server-side Stripe (for API routes only)
export const getServerStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-06-30.basil',
  });
};
