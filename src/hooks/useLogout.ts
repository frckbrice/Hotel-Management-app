"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    if (isLoggingOut) return; // Prevent multiple calls

    try {
      setIsLoggingOut(true);

      // Clear all possible NextAuth storage items
      if (typeof window !== "undefined") {
        // Clear localStorage items
        localStorage.removeItem("next-auth.session-token");
        localStorage.removeItem("next-auth.csrf-token");
        localStorage.removeItem("next-auth.callback-url");

        // Clear sessionStorage items
        sessionStorage.removeItem("next-auth.session-token");
        sessionStorage.removeItem("next-auth.csrf-token");

        // Clear cookies by setting them to expire
        document.cookie =
          "next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "next-auth.csrf-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "__Secure-next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }

      // Sign out with proper configuration
      await signOut({
        callbackUrl: "/",
        redirect: false,
      });

      // Force a page reload to ensure session is cleared and UI updates immediately
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, force reload to ensure clean state
      window.location.reload();
    }
  };

  return {
    logout,
    isLoggingOut,
  };
};
