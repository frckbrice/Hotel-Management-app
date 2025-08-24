import Rooms from "@/components/pages/Room/room";
import { Metadata } from "next";

// add meta data
export const metadata: Metadata = {
  title: "Rooms | Hotel Management",
  description: "Rooms page",
  keywords: ["Rooms", "Hotel", "Management"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Rooms | Hotel Management",
    description: "Rooms page",
    url: "https://hotel-mgt.vercel.app",
    siteName: "Hotel Management",
    locale: "en_US",
    type: "website",
  },
};

export default async function RoomsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Rooms />
    </div>
  );
}
