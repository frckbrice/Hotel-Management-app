import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authSanityClient } from "./sanity";
import { nanoid } from "nanoid";
import { AdapterUser, VerificationToken } from "next-auth/adapters";
import bcrypt from "bcryptjs";

// Types for adapter methods
interface AdapterAccount {
  providerId: string;
  providerAccountId: string;
  userId: string;
  [key: string]: any;
}
interface AdapterVerificationToken {
  identifier: string;
  token: string;
  expires: string;
}

// Custom Sanity Adapter for Auth.js (NextAuth)
export const SanityAdapter = (client: any) => {
  return {
    async createUser(user: AdapterUser): Promise<AdapterUser> {
      const newUser = { _id: nanoid(), _type: "user", ...user };
      await client.create(newUser);
      return {
        id: newUser._id,
        name: newUser.name ?? "",
        email: newUser.email ?? "",
        image: newUser.image ?? "",
        emailVerified: newUser.emailVerified ?? null,
      };
    },
    async getUser(id: string): Promise<AdapterUser | null> {
      const user = await client.fetch("*[_type == 'user' && _id == $id][0]", { id });
      if (!user) return null;
      return {
        id: user._id,
        name: user.name ?? "",
        email: user.email ?? "",
        image: user.image ?? "",
        emailVerified: user.emailVerified ?? null,
      };
    },
    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      const user = await client.fetch("*[_type == 'user' && email == $email][0]", { email });
      if (!user) return null;
      return {
        id: user._id,
        name: user.name ?? "",
        email: user.email ?? "",
        image: user.image ?? "",
        emailVerified: user.emailVerified ?? null,
      };
    },
    async getUserByAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }): Promise<AdapterUser | null> {
      const account = await client.fetch(
        "*[_type == 'account' && providerId == $provider && providerAccountId == $providerAccountId][0]{user->}",
        { provider, providerAccountId }
      );
      const user = account?.user;
      if (!user) return null;
      return {
        id: user._id,
        name: user.name ?? "",
        email: user.email ?? "",
        image: user.image ?? "",
        emailVerified: user.emailVerified ?? null,
      };
    },
    async updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, "id">): Promise<AdapterUser> {
      await client.patch(user.id).set(user).commit();
      // Fetch the updated user to return
      const updatedUser = await client.fetch("*[_type == 'user' && _id == $id][0]", { id: user.id });
      return {
        id: updatedUser._id,
        name: updatedUser.name ?? "",
        email: updatedUser.email ?? "",
        image: updatedUser.image ?? "",
        emailVerified: updatedUser.emailVerified ?? null,
      };
    },
    async deleteUser(id: string) {
      await client.delete(id);
    },
    async linkAccount(account: AdapterAccount) {
      const newId = `account.${nanoid()}`;
      const newAccount = { _id: newId, _type: "account", ...account };
      await client.create(newAccount);
      await client.patch(newId).set({ user: { _type: "reference", _ref: account.userId } }).commit();
      return newAccount;
    },
    async unlinkAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }) {
      const account = await client.fetch(
        "*[_type == 'account' && providerId == $provider && providerAccountId == $providerAccountId][0]",
        { provider, providerAccountId }
      );
      if (account) await client.delete(account._id);
    },
    async createVerificationToken(verificationToken: VerificationToken): Promise<VerificationToken> {
      const newToken = {
        _id: `token.${nanoid()}`,
        _type: "verification-token",
        ...verificationToken,
        expires: verificationToken.expires.toISOString(),
      };
      await client.create(newToken);
      return {
        identifier: newToken.identifier,
        token: newToken.token,
        expires: new Date(newToken.expires),
      };
    },
    async useVerificationToken({ identifier, token }: { identifier: string; token: string }): Promise<VerificationToken | null> {
      const verificationToken = await client.fetch(
        "*[_type == 'verification-token' && identifier == $identifier && token == $token][0]",
        { identifier, token }
      );
      if (verificationToken) await client.delete(verificationToken._id);
      if (!verificationToken) return null;
      return {
        identifier: verificationToken.identifier,
        token: verificationToken.token,
        expires: new Date(verificationToken.expires),
      };
    },
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          console.log("Attempting to authenticate:", credentials.email);
          const user = await authSanityClient.fetch(
            "*[_type == 'user' && email == $email][0]",
            { email: credentials.email }
          );

          console.log("User found:", user ? "Yes" : "No");

          if (!user || !user.password) {
            console.log("User not found or no password");
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          console.log("Password valid:", isPasswordValid);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn callback:", { user, account, profile });
      return true;
    },
    async jwt({ token, user, account }) {
      console.log("JWT callback:", { token, user, account });
      if (user) {
        // Normalize user ID - remove 'user.' prefix if present (Google OAuth issue)
        let normalizedUserId = user.id;
        if (normalizedUserId && (normalizedUserId as string).startsWith('user.')) {
          normalizedUserId = (normalizedUserId as string).substring(5);
          console.log("JWT: Normalized user ID (removed 'user.' prefix):", normalizedUserId);
        }
        token.id = normalizedUserId;
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log("Session callback:", { session, token });
      try {
        const userEmail = token.email;
        if (!userEmail) {
          console.log("No email in token");
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id,
            },
          };
        }

        const userIdObject = await authSanityClient.fetch<{ _id: string }>(
          `*[_type=="user" && email == $email][0] { _id } `,
          { email: userEmail }
        );

        console.log("User ID object:", userIdObject);

        // Normalize user ID - remove 'user.' prefix if present (Google OAuth issue)
        let normalizedUserId = userIdObject?._id || token.id;
        if (normalizedUserId && (normalizedUserId as string).startsWith('user.')) {
          normalizedUserId = (normalizedUserId as string).substring(5);
          console.log("Normalized user ID (removed 'user.' prefix):", normalizedUserId);
        }

        return {
          ...session,
          user: {
            ...session.user,
            id: normalizedUserId,
          },
        };
      } catch (error) {
        console.error("Session callback error:", error);
        // Fallback: normalize the token ID as well
        let fallbackUserId = token.id;
        if (fallbackUserId && (fallbackUserId as string).startsWith('user.')) {
          fallbackUserId = (fallbackUserId as string).substring(5);
          console.log("Fallback normalized user ID:", fallbackUserId);
        }

        return {
          ...session,
          user: {
            ...session.user,
            id: fallbackUserId,
          },
        };
      }
    },
  },
};
