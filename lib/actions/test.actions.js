"use server";

import { connectToDb } from "@/mongo/database";
import Stays from "@/mongo/database/models/stays.model";
import User from "@/mongo/database/models/user.model";
import { createUser } from "./user.actions";

export const testDb = async () => {
  try {
    await connectToDb();

    const user = {
      clerkId: "b",
      email: "a",
      username: "a",
      firstName: "b",
      lastName: "a",
      photo: "b",
    };

    const newUser = await createUser(user);
    console.log(newUser);
  } catch (err) {
    console.log(err);
  }
};
