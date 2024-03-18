"use server";

import User from "@/mongo/database/models/user.model";

export const toggleFavourites = async (clerkId, stayId, currentState) => {
  try {
    let currentUser = await User.findOne({ clerkId });

    if (!currentUser) {
      throw new Error("User not found");
    }

    if (currentState) {
      await User.updateOne(
        { clerkId },
        { $pull: { favourites: stayId } }
      ).exec();
    } else {
      await User.updateOne(
        { clerkId },
        { $push: { favourites: stayId } }
      ).exec();
    }

    // Fetch the updated user document after modification
    currentUser = await User.findOne({ clerkId });

    return JSON.parse(JSON.stringify(currentUser)); // Return the updated user document
  } catch (error) {
    throw new Error(error);
  }
};
