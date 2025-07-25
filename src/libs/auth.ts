import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import sanityClient from "./sanity";
import { nanoid } from "nanoid";
import { AdapterUser, VerificationToken } from "next-auth/adapters";
// import bcrypt from "bcryptjs"; // Not used in this adapter

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
    // Credentials provider can be added here if needed
  ],
  session: {
    strategy: "jwt",
  },
  adapter: SanityAdapter(sanityClient),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      const userEmail = token.email;
      const userIdObject = await sanityClient.fetch<{ _id: string }>(
        `*[_type=="user" && email == $email][0] { _id } `,
        { email: userEmail }
      );
      return {
        ...session,
        user: {
          ...session.user,
          id: userIdObject?._id,
        },
      };
    },
  },
};
