import stripe from "stripe";
import { NextResponse } from "next/server";

export default async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY; 

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(err);
  }

  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const {}
  }
}
