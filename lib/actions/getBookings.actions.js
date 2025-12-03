"use server";

import { connectToDb } from "@/mongo/database";
import Bookings from "@/mongo/database/models/booking.model";

export const getPastBookings = async (clerkId) => {
  try {
    if (!clerkId) {
      return [];
    }
    await connectToDb();

    const currentDate = new Date();
    const clerkIdString = String(clerkId);

    const pastBookings = await Bookings.find({
      endDateConverted: { $lt: currentDate },
      "user._id": clerkIdString,
    }).lean();

    return JSON.parse(JSON.stringify(pastBookings));
  } catch (error) {
    console.error("Error fetching past bookings:", error);
    return [];
  }
};

export const getCurrentBookings = async (clerkId) => {
  try {
    if (!clerkId) {
      return [];
    }
    await connectToDb();

    const currentDate = new Date();
    const clerkIdString = String(clerkId);

    const currentBookings = await Bookings.find({
      startDateConverted: { $lte: currentDate },
      endDateConverted: { $gte: currentDate },
      "user._id": clerkIdString,
    }).lean();

    return JSON.parse(JSON.stringify(currentBookings));
  } catch (error) {
    console.error("Error fetching current bookings:", error);
    return [];
  }
};

export const getUpcomingBookings = async (clerkId) => {
  try {
    if (!clerkId) {
      return [];
    }
    await connectToDb();

    const currentDate = new Date();
    const clerkIdString = String(clerkId);

    const upcomingBookings = await Bookings.find({
      startDateConverted: { $gt: currentDate },
      "user._id": clerkIdString,
    }).lean();

    return JSON.parse(JSON.stringify(upcomingBookings));
  } catch (error) {
    console.error("Error fetching upcoming bookings:", error);
    return [];
  }
};

export const getAllBookings = async (clerkId) => {
  try {
    if (!clerkId) {
      return [];
    }
    await connectToDb();

    const clerkIdString = String(clerkId);

    const allBookings = await Bookings.find({
      "user._id": clerkIdString,
    }).lean();

    return JSON.parse(JSON.stringify(allBookings));
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return [];
  }
};

export const getBookingById = async (bookingId, clerkId) => {
  try {
    if (!clerkId) {
      return null;
    }
    await connectToDb();

    const clerkIdString = String(clerkId);

    const booking = await Bookings.findOne({
      _id: bookingId,
      "user._id": clerkIdString,
    }).lean();

    return JSON.parse(JSON.stringify(booking));
  } catch (error) {
    console.error("Error fetching booking:", error);
    return null;
  }
};
