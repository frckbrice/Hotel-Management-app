import RoomDetails from '@/components/Room/room-detail';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

// This file is used to render the room details page based on the slug provided in the URL.
// It fetches the room details and displays them using the RoomDetails component.
// If the slug is not provided, it returns a 404 not found page.
// The generateMetadata function is used to set the title and description of the page dynamically based on the slug.

// generate metadata for the page
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `Room Details - ${slug}`,
    description: `Details of the room with slug ${slug}`,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  if (!slug) return notFound();

  return <RoomDetails slug={slug} />;
}
