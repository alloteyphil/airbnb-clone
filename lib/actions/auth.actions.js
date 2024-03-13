"use server";

import User from "mongo/database/models/user.model";

export const getCurrentUser = async (clerkId) => {
  const currentUser = await User.findOne({ clerkId });
  return JSON.parse(JSON.stringify(currentUser));
};
