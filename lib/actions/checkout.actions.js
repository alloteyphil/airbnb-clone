"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";

export const checkoutOrder = async (booking) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let url;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: booking.title,
            },
            unit_amount: booking.price * 100 * booking.nights,
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId: booking.stayId,
        userId: booking.userId,
        nights: booking.nights,
        startDate: booking.startDate,
        endDate: booking.endDate,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success`,
      cancel_url: process.env.NEXT_PUBLIC_SERVER_URL,
    });
    url = session.url;
  } catch (error) {
    console.error(error);
  } finally {
    redirect(url);
  }
};
