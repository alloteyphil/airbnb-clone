/* eslint-disable react/no-unescaped-entities */
"use client";

import { useDateStore } from "@/store/store";
import BookingDate from "./BookingDate";
import Guests from "./Guests";
import ReserveButton from "./ReserveButton";

const Booking = ({ price, id }) => {
  const { startDate, endDate } = useDateStore((state) => state);

  const nights =
    (new Date(endDate).setHours(0, 0, 0, 0) -
      new Date(startDate).setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24) || 1;

  return (
    <div className="flex flex-col gap-6 rounded-2xl shadow-xl min-h-[300px] w-full p-6 border">
      <p className="font-normal text-2xl">
        ${price}
        <span className="text-base font-light"> /night</span>
      </p>
      <div className="flex flex-col w-full border border-neutral-300 rounded-xl">
        <BookingDate />
        <Guests />
      </div>
      <div className="flex flex-col gap-3">
        <ReserveButton id={id} />
        <p className="text-center text-sm">You won't be charged yet</p>
      </div>
      <div className="flex flex-col">
        <div className="border-b-[0.5px] border-neutral-300 py-4 flex justify-between">
          <p className="underline text-sm">
            ${price} x {nights} night{`${nights === 1 ? "" : "s"}`}
          </p>
          <p className="">
            ${new Intl.NumberFormat("en-US").format(price * nights)}
          </p>
        </div>
        <div className="py-4 flex justify-between">
          <p className="font-medium">Total before taxes</p>
          <p className="font-medium">
            ${new Intl.NumberFormat("en-US").format(price * nights)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Booking;
