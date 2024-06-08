"use server";

import { connectToDb } from "@/mongo/database";
import Bookings from "@/mongo/database/models/booking.model";

export const createBooking = async (booking) => {
  try {
    await connectToDb();

    const newBooking = Bookings.create(booking);

    return JSON.parse(JSON.stringify(newBooking));
  } catch (error) {
    console.log(error);
  }
};
