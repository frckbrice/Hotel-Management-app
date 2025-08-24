import RoomDetails from "@/components/pages/Room/room-detail";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

// This file is used to render the room details page based on the slug provided in the URL.
// It fetches the room details and displays them using the RoomDetails component.
// If the slug is not provided, it returns a 404 not found page.
// The generateMetadata function is used to set the title and description of the page dynamically based on the slug.

// generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  return {
    title: `Room Details - ${slug}`,
    description: `Details of the room with slug ${slug}`,
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  if (!slug) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <RoomDetails slug={slug} />
    </div>
  );
}
