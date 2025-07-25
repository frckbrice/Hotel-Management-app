import { Stripe as Stripejs, loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";


let stripePromise: Promise<Stripejs | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as string
    );
  }
  return stripePromise;
};

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-06-30.basil",
});