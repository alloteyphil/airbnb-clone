import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getSingleStay } from "@/lib/actions/getSingularStay.action";
import { getUserByClerk } from "@/lib/actions/user.actions";
import { createBooking } from "@/lib/actions/booking.actions";
import getRawBody from "raw-body";

export default async function handler(req) {
  console.log("Request received:", req.method);

  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    console.error("Error getting raw body:", err.message);
    return NextResponse.json(
      { message: "Error getting raw body" },
      { status: 400 }
    );
  }

  const sig = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET_KEY;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Error constructing webhook event:", err.message);
    return NextResponse.json(
      { message: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  console.log("Event type:", event.type);

  if (event.type === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    try {
      const stay = await getSingleStay(metadata?.bookingId);
      const user = await getUserByClerk(metadata?.userId);

      const booking = {
        stripeId: id,
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        stay: {
          _id: stay._id,
          title: stay.title,
          price: stay.price,
          images: stay.images,
        },
        nights: metadata?.nights,
        image: metadata?.image,
        startDate: metadata?.startDate,
        endDate: metadata?.endDate,
        totalPrice: amount_total,
      };

      const newBooking = await createBooking(booking);

      return NextResponse.json(newBooking);
    } catch (err) {
      console.error("Error processing booking:", err.message);
      return NextResponse.json(
        { message: "Error processing booking" },
        { status: 500 }
      );
    }
  }

  return new Response("", { status: 200 });
}
