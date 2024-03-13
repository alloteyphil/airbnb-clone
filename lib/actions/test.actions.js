"use server";

import { connectToDb } from "@/mongo/database";
import Stays from "@/mongo/database/models/stays.model";
import User from "@/mongo/database/models/user.model";
import { createUser } from "./user.actions";
import { auth } from "@clerk/nextjs";

export const testDb = async () => {
  try {
    await connectToDb();

    const user = auth();
    console.log(user);

    // const currentUser = await User.find({ clerkId: user.id });
    // console.log(currentUser);
  } catch (err) {
    console.log(err);
  }
};
