"use server";

import { connectToDb } from "@/mongo/database";
import User from "@/mongo/database/models/user.model";

export const getCurrentUser = async (clerkId) => {
  try {
    await connectToDb();
    const currentUser = await User.findOne({ clerkId });
    return JSON.parse(JSON.stringify(currentUser));
  } catch (error) {
    return null;
  }
};
