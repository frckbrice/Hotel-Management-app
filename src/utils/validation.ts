import { z } from "zod";
import crypto from "node:crypto";

// Email validation schema
export const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(1, "Email is required")
  .max(254, "Email too long");

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password too long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  );

// Name validation schema
export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name too long")
  .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters");

// Date validation schema
export const dateSchema = z.string().refine((date) => {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime()) && parsed > new Date();
}, "Invalid date - must be in the future");

// Number validation schema
export const positiveNumberSchema = z
  .number()
  .positive("Must be a positive number")
  .int("Must be an integer");

// String sanitization
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .substring(0, 1000); // Limit length
};

// Email sanitization
export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

// URL validation and sanitization
export const urlSchema = z
  .string()
  .url("Invalid URL")
  .refine((url) => {
    try {
      const parsed = new URL(url);
      return ["http:", "https:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  }, "Invalid URL protocol");

// Stripe webhook signature validation
export const validateStripeSignature = (
  payload: string,
  signature: string,
  secret: string,
): boolean => {
  try {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload, "utf8")
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    );
  } catch {
    return false;
  }
};

// Rate limiting helper
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, [now]);
      return true;
    }

    const requests = this.requests.get(identifier)!;
    const validRequests = requests.filter((time) => time > windowStart);

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }

  cleanup(): void {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    Array.from(this.requests.entries()).forEach(([identifier, requests]) => {
      const validRequests = requests.filter((time: any) => time > windowStart);
      if (validRequests.length === 0) {
        this.requests.delete(identifier);
      } else {
        this.requests.set(identifier, validRequests);
      }
    });
  }
}

// CSRF protection
export const generateCSRFToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

export const validateCSRFToken = (
  token: string,
  storedToken: string,
): boolean => {
  return token === storedToken;
};

// SQL injection prevention for Sanity queries
export const sanitizeSanityQuery = (query: string): string => {
  // Remove any potential injection patterns
  return query
    .replace(/[;'"\\]/g, "") // Remove dangerous characters
    .replace(/\b(union|select|insert|update|delete|drop|create|alter)\b/gi, "") // Remove SQL keywords
    .trim();
};

// XSS prevention
export const escapeHtml = (str: string): string => {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
};

// Input validation for API routes
export const validateAPIInput = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; error: string } => {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: "Validation failed" };
  }
};
