import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getSingleStay } from "@/lib/actions/getSingularStay.action";
import { getUserByClerk } from "@/lib/actions/user.actions";
import { createBooking } from "@/lib/actions/booking.actions";
import { headers } from "next/headers";
import { testDb } from "@/lib/actions/test.actions";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const body = await req.text();
  const sig = headers().get("Stripe-Signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET_KEY;
  let event;

  try {
    if (!sig || !endpointSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(err);
  }

  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const { id, amountTotal, metadata } = event.data.object;

    const { stay } = await getSingleStay(metadata?.bookingId);

    const { _id: stayId, title, price, images } = stay;

    const { _id, firstName, lastName, email } = await getUserByClerk(
      metadata?.userId
    );

    // const {
    //   stay: { _id: stayId, title, price, images },
    // } = await getSingleStay(metadata?.bookingId);

    // const { _id, firstName, lastName, email } = await getUserByClerk(
    //   metadata?.userId
    // );

    const booking = {
      stripeId: id,
      user: {
        _id,
        firstName,
        lastName,
        email,
      },
      stay: {
        _id: stayId,
        title,
        price,
        images,
      },
      nights: metadata?.nights,
      image: metadata?.image,
      startDate: metadata?.startDate,
      endDate: metadata?.endDate,
      totalPrice: amountTotal,
    };

    // await testDb(booking.user.email);
    const newBooking = await createBooking(booking);

    // return NextResponse.json(newBooking);
  }
  return new Response("", { status: 200 });
}
