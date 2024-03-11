"use server";

import { connectToDb } from "@/mongo/database";
import Stays from "@/mongo/database/models/stays.model";

export const testDb = async () => {
  try {
    await connectToDb();

    const stays = await Stays.find();
    console.log(stays);
  } catch (err) {
    console.log(err);
  }
};
