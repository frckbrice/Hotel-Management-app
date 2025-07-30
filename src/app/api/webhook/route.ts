import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createBooking, updateHotelRoom } from '@/libs/apis';
import { getServerStripe } from '@/libs/stripe';

//* How to set up your webhook integration

//1. identification of the event we want to monitor
const checkout_session_completed = 'checkout.session.completed';

//2. develop a webhook endpoint function to receive event data POST request
export async function POST(req: Request) {
  console.log('=== WEBHOOK RECEIVED ===');
  console.log('Webhook - Headers:', Object.fromEntries(req.headers.entries()));

  const reqBody = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  console.log('Webhook - Request body length:', reqBody.length);
  console.log('Webhook - Signature present:', !!sig);
  console.log('Webhook - Secret present:', !!webhookSecret);

  let event: Stripe.Event;

  try {
    //* we create our event object
    if (!sig || !webhookSecret) {
      console.log('Webhook - Missing signature or secret');
      return new NextResponse('Missing signature or secret', { status: 400 });
    }
    const stripe = getServerStripe();
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
    console.log('Webhook - Event constructed successfully:', event.type);
  } catch (error: any) {
    console.log(
      'error occured while generating event from webhook constructor: ',
      error
    );
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }

  //* load our event
  switch (event.type) {
    case checkout_session_completed:
      console.log('Webhook - Processing checkout.session.completed event');
      const session = event.data.object;
      console.log('Webhook - Session data:', {
        id: session.id,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        customer: session.customer,
      });
      console.log('Webhook - Session metadata:', session.metadata);

      if (!session.metadata) {
        console.log('Webhook - ERROR: No metadata found in session');
        return new NextResponse('No metadata found', { status: 400 });
      }

      try {
        //* create a booking in sanity DB
        const bookingData = {
          adults: Number(session.metadata?.adults),
          checkinDate: session.metadata?.checkinDate as string,
          checkoutDate: session.metadata?.checkoutDate as string,
          children: Number(session.metadata?.children),
          hotelRoom: session.metadata?.hotelRoom as string,
          numberOfDays: Number(session.metadata?.numberOfDays),
          discount: Number(session.metadata?.discount),
          totalPrice: Number(session.metadata?.totalPrice),
          user: session.metadata?.user as string,
        };

        console.log('Webhook - Creating booking with data:', bookingData);
        console.log('Webhook - User ID from metadata:', session.metadata?.user);
        console.log(
          'Webhook - Room ID from metadata:',
          session.metadata?.hotelRoom
        );
        console.log('Webhook - User ID from metadata:', session.metadata?.user);
        console.log(
          'Webhook - Room ID from metadata:',
          session.metadata?.hotelRoom
        );

        const bookingResult = await createBooking(bookingData);
        console.log('Webhook - Booking created successfully:', bookingResult);
        console.log(
          'Webhook - Booking ID:',
          bookingResult?.result?._id || bookingResult?._id
        );

        // *   Update hotel Room
        console.log(
          'Webhook - Updating hotel room:',
          session.metadata?.hotelRoom
        );
        await updateHotelRoom(session.metadata?.hotelRoom as string);
        console.log('Webhook - Hotel room updated successfully');

        return NextResponse.json('Booking successful', {
          status: 200,
          statusText: 'Booking Successful',
        });
      } catch (error) {
        console.error('Webhook - Error creating booking:', error);
        return new NextResponse(`Booking creation failed: ${error}`, {
          status: 500,
        });
      }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  //* return response to acknowledge receipt of event
  return NextResponse.json('Event Received', {
    status: 200,
    statusText: 'Event Received',
  });
}

// need to test locally : install stripe cli
