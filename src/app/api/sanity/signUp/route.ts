import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  emailSchema,
  passwordSchema,
  nameSchema,
  sanitizeEmail,
  sanitizeString,
} from "@/utils/validation";
import { ZodError, ZodSafeParseError } from "zod";

// Create a direct Sanity client for signup (no session authentication)
const signupSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_STUDIO_TOKEN,
  apiVersion: "2021-10-21",
  perspective: "published",
  stega: false,
});

// Simple rate limiter for signup
const signupAttempts = new Map<
  string,
  { count: number; lastAttempt: number }
>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const attempt = signupAttempts.get(identifier);

  if (!attempt) {
    signupAttempts.set(identifier, { count: 1, lastAttempt: now });
    return false;
  }

  if (now - attempt.lastAttempt > WINDOW_MS) {
    signupAttempts.set(identifier, { count: 1, lastAttempt: now });
    return false;
  }

  if (attempt.count >= MAX_ATTEMPTS) {
    return true;
  }

  attempt.count++;
  attempt.lastAttempt = now;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    console.log("Signup request received");

    // Security: Check request method
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 },
      );
    }

    // Check if required environment variables are set
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      console.error("Missing SANITY_PROJECT_ID");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    if (!process.env.SANITY_WRITE_TOKEN && !process.env.SANITY_STUDIO_TOKEN) {
      console.error("Missing Sanity token");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { email, password, name } = body;

    // Security: Input validation and sanitization
    const sanitizedEmail = sanitizeEmail(email || "");
    const sanitizedName = sanitizeString(name || "");
    const sanitizedPassword = password || "";

    // Validate inputs
    try {
      emailSchema.safeParse(sanitizedEmail);
      passwordSchema.safeParse(sanitizedPassword);
      nameSchema.safeParse(sanitizedName);
    } catch (error: any) {
      console.error("Validation error:", error);

      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 });
      }

      // Generic error fallback
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Validation failed" },
        { status: 400 },
      );
    }

    // Security: Rate limiting
    const clientIP =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: "Too many signup attempts. Please try again later." },
        { status: 429 },
      );
    }

    console.log("Signup data:", {
      email: sanitizedEmail,
      name: sanitizedName,
      hasPassword: !!sanitizedPassword,
    });

    // Check if user already exists
    console.log("Checking for existing user...");
    const existingUser = await signupSanityClient.fetch(
      "*[_type == 'user' && email == $email][0]",
      { email: sanitizedEmail },
    );

    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    // Security: Hash the password with proper salt rounds
    console.log("Hashing password...");
    const saltRounds = 12; // Increased from 10 for better security
    const hashedPassword = await bcrypt.hash(sanitizedPassword, saltRounds);

    // Create the user with sanitized data
    console.log("Creating user...");
    const newUser = {
      _type: "user",
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashedPassword,
      image: "",
      isAdmin: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const createdUser = await signupSanityClient.create(newUser);
    console.log("User created successfully:", createdUser._id);

    // Security: Don't return sensitive data
    return NextResponse.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);

    // Security: Don't expose internal errors
    if (error instanceof Error && error.message.includes("permission")) {
      return NextResponse.json(
        { error: "Server configuration error - check Sanity permissions" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to sign up. Please try again later.",
      },
      { status: 500 },
    );
  }
}
