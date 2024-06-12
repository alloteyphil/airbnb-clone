"use server";

import { connectToDb } from "@/mongo/database";
import Bookings from "@/mongo/database/models/booking.model";

export const createBooking = async (booking) => {
  try {
    await connectToDb();

    const newBooking = await Bookings(booking);

    try {
      const savedBooking = await newBooking.save();
      return JSON.parse(JSON.stringify(savedBooking));
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
