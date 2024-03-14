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

    const userTest = await User.updateOne(
      { clerkId: "user_2deiaLJTUK488zFsudQsUDrUjsy" },
      { $set: { favourites: ["65e65171a1ba015f7096643e"] } }
    );
  } catch (err) {
    console.log(err);
  }
};
