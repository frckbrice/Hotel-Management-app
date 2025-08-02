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
  return <Rooms />;
}
