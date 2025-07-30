import { getRoomReviews } from '@/libs/apis';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response | undefined> {
  const { id: roomId } = await params;

  try {
    const roomReviews = await getRoomReviews(roomId);

    return NextResponse.json(roomReviews, {
      status: 200,
      statusText: 'success',
    });
  } catch (error) {
    console.log('error fetching review data, ', error);
    return new NextResponse('error fetching review data!!', { status: 500 });
  }
}
