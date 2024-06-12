"use server";

import { connectToDb } from "@/mongo/database";
import User from "@/mongo/database/models/user.model";

export const testDb = async (name) => {
  try {
    await connectToDb();

    await User.updateOne(
      { clerkId: "user_2denTAqdZ1Y97KOW0oMNIVtjjVu" },
      { $set: { lastName: name } }
    );
  } catch (err) {
    console.log(err);
  }
};
