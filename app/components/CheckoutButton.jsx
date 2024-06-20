"use client";

import { checkoutOrder } from "@/lib/actions/checkout.actions";
import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutButton = ({
  stayId,
  title,
  price,
  image,
  nights,
  startDate,
  endDate,
}) => {
  const { user } = useUser();

  let booking;

  if (user) {
    booking = {
      userId: user.id,
      stayId,
      title,
      image,
      price,
      nights,
      startDate,
      endDate,
    };
  }

  const onCheckout = async () => {
    if (booking === undefined) return;
    await checkoutOrder(booking);
  };

  return (
    <button
      onClick={onCheckout}
      className="bg-theme transition duration-300 ease-in-out py-4 font-normal text-white text-sm cursor-pointer w-full rounded-xl hover:bg-primary"
    >
      Continue
    </button>
  );
};

export default CheckoutButton;
