"use server";

import { connectToDb } from "@/mongo/database";
import Bookings from "@/mongo/database/models/booking.model";

export const getPastBookings = async (clerkId) => {
  try {
    await connectToDb();

    const currentDate = new Date();

    // const pastBookings = await Bookings.find({
    //   endDate: { $lt: currentDate },
    //   "user._id": clerkId,
    // });

    const booking = await Bookings.aggregate([
      {
        $addFields: {
          endDateConverted: {
            $dateFromString: {
              dateString: "$startDate",
              format: "%d/%b/%Y",
            },
          },
        },
      },
      {
        $match: {
          endDateConverted: { $lt: currentDate },
          "user._id": clerkId,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(booking));
  } catch (error) {
    console.log(error);
  }
};
