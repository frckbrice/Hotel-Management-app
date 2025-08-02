import { z } from "zod";

// Environment variable schema
const envSchema = z.object({
  // NextAuth
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),

  // Sanity
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
  NEXT_PUBLIC_SANITY_DATASET: z.string(),
  SANITY_WRITE_TOKEN: z.string().optional(),
  SANITY_STUDIO_TOKEN: z.string().optional(),

  // Stripe
  STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
  STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),

  // OAuth Providers
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  // Email
  EMAIL_USER: z.string().email().optional(),
  EMAIL_PASS: z.string().optional(),
  CONTACT_EMAIL: z.string().email().optional(),

  // Environment
  NODE_ENV: z.enum(["development", "production", "test"]),
});

// Validate environment variables
export function validateEnv() {
  try {
    const env = envSchema.parse(process.env);
    return { success: true, env };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Environment validation failed:");
      const zodError = error as z.ZodError;
      zodError.issues.forEach((issue: z.ZodIssue) => {
        console.error(`- ${issue.path.join(".")}: ${issue.message}`);
      });
    }
    return { success: false, error };
  }
}

// Get validated environment variables
export function getEnv() {
  const result = validateEnv();
  if (!result.success) {
    throw new Error("Environment validation failed");
  }
  return result.env;
}

// Check if required environment variables are set
export function checkRequiredEnv() {
  const requiredVars = [
    "NEXTAUTH_URL",
    "NEXTAUTH_SECRET",
    "NEXT_PUBLIC_SANITY_PROJECT_ID",
    "NEXT_PUBLIC_SANITY_DATASET",
    "STRIPE_PUBLISHABLE_KEY",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
  ];

  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    console.error("Missing required environment variables:", missing);
    return false;
  }

  return true;
}
