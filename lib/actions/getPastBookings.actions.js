"use server";

import { connectToDb } from "@/mongo/database";
import Bookings from "@/mongo/database/models/booking.model";

export const getPastBookings = async (clerkId) => {
  try {
    await connectToDb();

    const currentDate = new Date();

    const pastBookings = await Bookings.find({
      endDate: { $lt: currentDate },
      "user._id": clerkId,
    });

    return JSON.parse(JSON.stringify(pastBookings));
  } catch (error) {
    console.log(error);
  }
};
