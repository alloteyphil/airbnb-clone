import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getSingleStay } from "@/lib/actions/getSingularStay.action";
import { getUserByClerk } from "@/lib/actions/user.actions";
import { createBooking } from "@/lib/actions/booking.actions";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req) {
  if (req.method !== "POST")
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET_KEY;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(err);
  }

  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const { id, amountTotal, metadata } = event.data.object;

    const {
      _id: stayId,
      title,
      price,
      images,
    } = await getSingleStay(metadata?.bookingId);

    const { _id, firstName, lastName, email } = await getUserByClerk(
      metadata?.userId
    );

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

    const newBooking = await createBooking(booking);

    return NextResponse.json(newBooking);
  }
  return new Response("", { status: 200 });
}
