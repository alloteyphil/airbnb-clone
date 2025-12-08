import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getSingleStay } from "@/lib/actions/getSingularStay.action";
import { getUserByClerk } from "@/lib/actions/user.actions";
import { createBooking } from "@/lib/actions/booking.actions";
import { headers } from "next/headers";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const body = await req.text();
  const sig = (await headers()).get("Stripe-Signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET_KEY;
  let event;

  try {
    if (!sig || !endpointSecret) {
      return new NextResponse("Webhook Error: Missing signature or secret", {
        status: 400,
      });
    }
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;
    const stay = await getSingleStay(metadata?.bookingId);
    const { _id: stayId, title, price, images } = stay;
    const { clerkId, firstName, lastName, email } = await getUserByClerk(
      metadata?.userId
    );

    const booking = {
      stripeId: id || "",
      user: {
        _id: clerkId || "",
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
      },
      stay: {
        _id: stayId || "",
        title: title || "",
        price: parseInt(price) || 0,
        images: images || [],
      },
      nights: parseInt(metadata?.nights) || 0,
      image: metadata?.image || "",
      startDate: metadata?.startDate || "",
      startDateConverted: new Date(metadata?.startDate) || "",
      endDate: metadata?.endDate || "",
      endDateConverted: new Date(metadata?.endDate) || "",
      totalPrice: parseInt(amount_total) / 100 || 0,
    };

    const newBooking = await createBooking(booking);

    return NextResponse.json(newBooking);
  }
  return new Response("", { status: 200 });
}
