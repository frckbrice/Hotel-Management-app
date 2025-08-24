"use client";
import { SessionProvider } from "next-auth/react";

export default function NextAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      // Re-fetch on window focus
      refetchOnWindowFocus={true}
      // Re-fetch when tab becomes visible
      refetchWhenOffline={false}
      // Ensure session updates are immediate
      basePath="/api/auth"
    >
      {children}
    </SessionProvider>
  );
}
