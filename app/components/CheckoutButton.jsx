"use client";

import { checkoutOrder } from "@/lib/actions/checkout.actions";
import { useUser } from "@clerk/nextjs";

const CheckoutButton = ({
  stayId,
  title,
  price,
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
      price,
      nights,
      startDate,
      endDate,
    };
  }

  const onCheckout = async () => {
    if (booking) {
      await checkoutOrder(booking);
    }
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
