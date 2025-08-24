// import { NextAuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { createClient } from "next-sanity";

// // Create Sanity client for authentication
// const sanityClient = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   apiVersion: "2024-01-01",
//   useCdn: false, // We need real-time data for authentication
//   token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN, // Use write token for read/write access
// });

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID || "",
//       clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           throw new Error("Email and password are required");
//         }

//         const query = `*[_type == "user" && email == $email][0] {
//           _id,
//           name,
//           email,
//           image,
//           password,
//           isAdmin
//         }`;

//         const user = await sanityClient.fetch(query, {
//           email: credentials.email,
//         });

//         if (!user || !user.password) {
//           throw new Error("Invalid credentials");
//         }

//         const isValidPassword = await bcrypt.compare(
//           credentials.password,
//           user.password,
//         );

//         if (!isValidPassword) {
//           throw new Error("Invalid credentials");
//         }

//         return {
//           id: user._id,
//           email: user.email,
//           name: user.name,
//           image: user.image,
//           isAdmin: user.isAdmin,
//         };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//     updateAge: 24 * 60 * 60, // 24 hours
//   },
//   cookies: {
//     sessionToken: {
//       name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         sameSite: 'lax',
//         path: '/',
//         secure: process.env.NODE_ENV === 'production',
//       },
//     },
//   },
//   callbacks: {

//     async signIn({ user, account, profile }) {
//       // Handle OAuth sign in
//       if (account?.provider === "google" || account?.provider === "github") {
//         try {
//           // Check if user already exists
//           const existingUser = await sanityClient.fetch(
//             `*[_type == "user" && email == $email][0]`,
//             { email: user.email },
//           );

//           if (existingUser) {
//             console.log("OAuth user already exists:", existingUser);
//             // Update user with latest OAuth info
//             await sanityClient.createOrReplace({
//               _id: existingUser._id,
//               _type: "user",
//               name: user.name || existingUser.name,
//               email: user.email,
//               image: user.image || existingUser.image,
//               isAdmin: existingUser.isAdmin || false,
//               updatedAt: new Date().toISOString(),
//             });
//             // Set the user ID for session
//             user.id = existingUser._id;
//             return true;
//           } else {
//             // Create new user
//             const newUser = {
//               _type: "user",
//               name: user.name,
//               email: user.email,
//               image: user.image || "",
//               isAdmin: false,
//               createdAt: new Date().toISOString(),
//               updatedAt: new Date().toISOString(),
//             };

//             const createdUser = await sanityClient.create(newUser);
//             console.log("Created new OAuth user:", createdUser);

//             // Update the user object with the database ID
//             user.id = createdUser._id;
//             return true;
//           }
//         } catch (error) {
//           console.error("Error handling OAuth sign in:", error);
//           return false;
//         }
//       }

//       // For credentials provider, just return true
//       return true;
//     },

//     async redirect({ url, baseUrl }) {
//       // Handle redirects after authentication
//       // If the URL is relative, prefix it with the base URL
//       if (url.startsWith("/")) return `${baseUrl}${url}`;
//       // If the URL is on the same origin, allow it
//       else if (new URL(url).origin === baseUrl) return url;
//       // Otherwise, redirect to home page
//       return baseUrl;
//     },
//     async jwt({ token, user, account }) {
//       // If we have a user object, update the token
//       if (user) {
//         token.id = user.id;
//         token.isAdmin = user.isAdmin;
//         token.email = user.email;
//         token.name = user.name;
//         token.image = user.image;
//       }

//       // For OAuth, ensure we have the user ID
//       if (account?.provider === "google" || account?.provider === "github") {
//         try {
//           // Fetch user from database to get the correct ID
//           const dbUser = await sanityClient.fetch(
//             `*[_type == "user" && email == $email][0]`,
//             { email: token.email },
//           );

//           if (dbUser) {
//             token.id = dbUser._id;
//             token.isAdmin = dbUser.isAdmin || false;
//           }
//         } catch (error) {
//           console.error("Error fetching OAuth user from database:", error);
//         }
//       }

//       return token;
//     },
//     async session({ session, token }) {
//       // Ensure we have the user ID in the session
//       if (token.id) {
//         session.user.id = token.id as string;
//         session.user.isAdmin = token.isAdmin as boolean;
//         session.user.email = token.email as string;
//         session.user.name = token.name as string;
//         session.user.image = token.image as string | undefined;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createClient } from "next-sanity";

// Validate required environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  SANITY_API_TOKEN:
    process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error("Missing required environment variables:", missingVars);
  throw new Error(`Missing environment variables: ${missingVars.join(", ")}`);
}

// Create Sanity client for authentication
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false, // We need real-time data for authentication
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true, // Suppress browser token warnings in development
});

export const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.log("Missing email or password");
          return null;
        }

        try {
          const query = `*[_type == "user" && email == $email][0] {
            _id,
            name,
            email,
            image,
            password,
            isAdmin
          }`;

          const user = await sanityClient.fetch(query, {
            email: credentials.email.toLowerCase().trim(),
          });

          if (!user) {
            console.log("User not found for email:", credentials.email);
            return null;
          }

          if (!user.password) {
            console.log("User has no password (OAuth user?)");
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isValidPassword) {
            console.log("Invalid password for user:", credentials.email);
            return null;
          }

          console.log(
            "Credentials authentication successful for:",
            credentials.email,
          );

          // Return user object that will be used in JWT callback
          return {
            id: user._id,
            email: user.email,
            name: user.name || "User",
            image: user.image || null,
            isAdmin: user.isAdmin || false,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours - Update session every 24 hours
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // Add maxAge for better cookie management
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    },
    // Add CSRF token configuration for better security
    csrfToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn callback triggered", {
        provider: account?.provider,
        email: user.email,
        userId: user.id,
      });

      // Handle OAuth sign in
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          // Normalize email
          const email = user.email?.toLowerCase().trim();
          if (!email) {
            console.error("No email provided by OAuth provider");
            return false;
          }

          // Check if user already exists
          const existingUser = await sanityClient.fetch(
            `*[_type == "user" && email == $email][0] {
              _id,
              name,
              email,
              image,
              isAdmin,
              createdAt,
              updatedAt
            }`,
            { email },
          );

          if (existingUser) {
            console.log("OAuth user already exists:", existingUser._id);

            // Update user with latest OAuth info if needed
            const updateData = {
              _id: existingUser._id,
              _type: "user",
              name: user.name || existingUser.name,
              email: email,
              image: user.image || existingUser.image,
              isAdmin: existingUser.isAdmin || false,
              createdAt: existingUser.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            const updatedUser = await sanityClient.createOrReplace(updateData);
            console.log("Updated OAuth user:", updatedUser._id);

            // Set the user ID for session - IMPORTANT for proper session management
            user.id = existingUser._id;
            user.isAdmin = existingUser.isAdmin || false;

            return true;
          } else {
            // Create new user
            const newUserData = {
              _type: "user",
              name: user.name || "User",
              email: email,
              image: user.image || null,
              isAdmin: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            const createdUser = await sanityClient.create(newUserData);
            console.log("Created new OAuth user:", createdUser._id);

            // Update the user object with the database ID
            user.id = createdUser._id;
            user.isAdmin = false;

            return true;
          }
        } catch (error) {
          console.error("Error handling OAuth sign in:", error);
          // Return false to prevent sign in on error
          return false;
        }
      }

      // For credentials provider, user ID is already set in authorize function
      console.log("Credentials sign in successful");
      return true;
    },

    async redirect({ url, baseUrl }) {
      console.log("Redirect callback:", { url, baseUrl });

      // Handle redirects after authentication
      // If the URL is relative, prefix it with the base URL
      if (url.startsWith("/")) {
        const redirectUrl = `${baseUrl}${url}`;
        console.log("Redirecting to:", redirectUrl);
        return redirectUrl;
      }
      // If the URL is on the same origin, allow it
      else if (new URL(url).origin === baseUrl) {
        console.log("Redirecting to same origin:", url);
        return url;
      }
      // Otherwise, redirect to home page
      console.log("Redirecting to base URL:", baseUrl);
      return baseUrl;
    },

    async jwt({ token, user, account, trigger }) {
      console.log("JWT callback triggered", {
        hasUser: !!user,
        hasAccount: !!account,
        trigger,
        tokenId: token.id,
        userEmail: user?.email || token.email,
      });

      // Initial sign in - store user data in token
      if (user) {
        console.log("Setting user data in token:", user.id);
        token.id = user.id;
        token.isAdmin = user.isAdmin || false;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }

      // Handle session updates (when session is refreshed)
      if (trigger === "update" && token.email) {
        console.log("Updating token data from database");
        try {
          // Refresh user data from database
          const dbUser = await sanityClient.fetch(
            `*[_type == "user" && email == $email][0] {
              _id,
              name,
              email,
              image,
              isAdmin
            }`,
            { email: token.email },
          );

          if (dbUser) {
            token.id = dbUser._id;
            token.isAdmin = dbUser.isAdmin || false;
            token.name = dbUser.name;
            token.image = dbUser.image;
            console.log("Token updated from database");
          }
        } catch (error) {
          console.error("Error refreshing user data:", error);
        }
      }

      // For OAuth providers, ensure we have the correct user ID from database
      if (
        account?.provider &&
        (account.provider === "google" || account.provider === "github") &&
        token.email
      ) {
        console.log("Fetching OAuth user data from database");
        try {
          // Fetch user from database to ensure we have the correct ID and latest data
          const dbUser = await sanityClient.fetch(
            `*[_type == "user" && email == $email][0] {
              _id,
              name,
              email,
              image,
              isAdmin
            }`,
            { email: token.email },
          );

          if (dbUser) {
            token.id = dbUser._id;
            token.isAdmin = dbUser.isAdmin || false;
            token.name = dbUser.name;
            token.image = dbUser.image;
            console.log("OAuth token updated from database");
          }
        } catch (error) {
          console.error("Error fetching OAuth user from database:", error);
        }
      }

      console.log("JWT callback complete, token ID:", token.id);
      return token;
    },

    async session({ session, token }) {
      console.log("Session callback triggered", {
        tokenId: token?.id,
        sessionEmail: session?.user?.email,
      });

      // Always ensure session has the latest token data
      if (token) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string | undefined;
      }

      console.log("Session callback complete, user ID:", session.user?.id);
      return session;
    },
  },

  // Add events for better logging and cleanup
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(
        `User signed in: ${user.email} via ${account?.provider || "credentials"}`,
      );
      if (isNewUser) {
        console.log(`New user created: ${user.email}`);
      }
    },

    async signOut({ token, session }) {
      console.log(`User signed out: ${token?.email || session?.user?.email}`);
    },

    async createUser({ user }) {
      console.log(`New user account created: ${user.email}`);
    },

    async updateUser({ user }) {
      console.log(`User account updated: ${user.email}`);
    },

    async linkAccount({ user, account, profile }) {
      console.log(`Account linked: ${account.provider} for ${user.email}`);
    },

    async session({ session, token }) {
      // This runs whenever a session is checked
      if (process.env.NODE_ENV === "development") {
        console.log(`Session accessed for: ${session.user?.email}`);
      }
    },
  },

  pages: {
    signIn: "/auth",
    // Add other custom pages if needed
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
  },

  // Enhanced security settings
  secret: process.env.NEXTAUTH_SECRET,

  // Add debug mode for development (this will help you see what's happening)
  debug: process.env.NODE_ENV === "development",

  // Configure JWT settings for better security
  jwt: {
    // Customize JWT encoding if needed
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Add logger for better debugging
  logger: {
    error(code, metadata) {
      console.error("NextAuth Error:", code, metadata);
    },
    warn(code) {
      console.warn("NextAuth Warning:", code);
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === "development") {
        console.log("NextAuth Debug:", code, metadata);
      }
    },
  },
};
