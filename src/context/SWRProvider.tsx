"use client";

import { SWRConfig } from "swr";

// Enhanced fetcher that can handle both URLs and functions
const fetcher = async (key: string | Function) => {
  if (typeof key === "function") {
    // If key is a function, call it directly
    return await key();
  }
  // If key is a string (URL), fetch it
  const res = await fetch(key);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
};

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 2000,
        errorRetryCount: 3,
        errorRetryInterval: 1000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
