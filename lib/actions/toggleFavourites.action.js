"use server";

import { connectToDb } from "@/mongo/database";
import User from "@/mongo/database/models/user.model";
import { revalidatePath } from "next/cache";

export const toggleFavourites = async (clerkId, stayId, isFavourited) => {
  try {
    await connectToDb();

    let updateQuery;

    if (isFavourited) {
      // Was favourited, so remove it
      updateQuery = { $pull: { favourites: stayId } };
    } else {
      // Was not favourited, so add it
      updateQuery = { $addToSet: { favourites: stayId } };
    }

    const user = await User.findOneAndUpdate(
      { clerkId },
      updateQuery,
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    revalidatePath("/");
    
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log("Error toggling favourites:", error);
    return null;
  }
};
