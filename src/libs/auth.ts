import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createClient } from "next-sanity";

// Create Sanity client for authentication
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false, // We need real-time data for authentication
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN, // Use write token for read/write access
});

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const query = `*[_type == "user" && email == $email][0] {
          _id,
          name,
          email,
          image,
          password,
          isAdmin
        }`;

        const user = await sanityClient.fetch(query, {
          email: credentials.email,
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          image: user.image,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle OAuth sign in
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          // Check if user already exists
          const existingUser = await sanityClient.fetch(
            `*[_type == "user" && email == $email][0]`,
            { email: user.email },
          );

          if (existingUser) {
            console.log("OAuth user already exists:", existingUser);
            // Update user with latest OAuth info
            await sanityClient.createOrReplace({
              _id: existingUser._id,
              _type: "user",
              name: user.name || existingUser.name,
              email: user.email,
              image: user.image || existingUser.image,
              isAdmin: existingUser.isAdmin || false,
              updatedAt: new Date().toISOString(),
            });
            // Set the user ID for session
            user.id = existingUser._id;
            return true;
          } else {
            // Create new user
            const newUser = {
              _type: "user",
              name: user.name,
              email: user.email,
              image: user.image || "",
              isAdmin: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            const createdUser = await sanityClient.create(newUser);
            console.log("Created new OAuth user:", createdUser);

            // Update the user object with the database ID
            user.id = createdUser._id;
            return true;
          }
        } catch (error) {
          console.error("Error handling OAuth sign in:", error);
          return false;
        }
      }

      // For credentials provider, just return true
      return true;
    },
    async jwt({ token, user, account }) {
      // If we have a user object, update the token
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }

      // For OAuth, ensure we have the user ID
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          // Fetch user from database to get the correct ID
          const dbUser = await sanityClient.fetch(
            `*[_type == "user" && email == $email][0]`,
            { email: token.email },
          );

          if (dbUser) {
            token.id = dbUser._id;
            token.isAdmin = dbUser.isAdmin || false;
          }
        } catch (error) {
          console.error("Error fetching OAuth user from database:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Ensure we have the user ID in the session
      if (token.id) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
