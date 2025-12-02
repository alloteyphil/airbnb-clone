"use server";

import { connectToDb } from "@/mongo/database";
import Bookings from "@/mongo/database/models/booking.model";

export const getPastBookings = async (clerkId) => {
  try {
    await connectToDb();

    const currentDate = new Date();

    const pastBookings = await Bookings.find({
      endDateConverted: { $lt: currentDate },
      "user._id": clerkId,
    });

    return JSON.parse(JSON.stringify(pastBookings));
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentBookings = async (clerkId) => {
  try {
    await connectToDb();

    const currentDate = new Date();

    const currentBookings = await Bookings.find({
      startDateConverted: { $lte: currentDate },
      endDateConverted: { $gte: currentDate },
      "user._id": clerkId,
    });

    return JSON.parse(JSON.stringify(currentBookings));
  } catch (error) {
    console.log(error);
  }
};

export const getUpcomingBookings = async (clerkId) => {
  try {
    await connectToDb();

    const currentDate = new Date();

    const upcomingBookings = await Bookings.find({
      startDateConverted: { $gt: currentDate },
      "user._id": clerkId,
    });

    return JSON.parse(JSON.stringify(upcomingBookings));
  } catch (error) {
    console.log(error);
  }
};

export const getAllBookings = async (clerkId) => {
  try {
    await connectToDb();

    const allBookings = await Bookings.find({
      "user._id": clerkId,
    });

    return JSON.parse(JSON.stringify(allBookings));
  } catch (error) {
    console.log(error);
  }
};

export const getBookingById = async (bookingId, clerkId) => {
  try {
    await connectToDb();

    const booking = await Bookings.findOne({
      _id: bookingId,
      "user._id": clerkId,
    });

    return JSON.parse(JSON.stringify(booking));
  } catch (error) {
    console.error("Error fetching booking:", error);
    return null;
  }
};
