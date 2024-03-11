"use server";

import { connectToDb } from "@/mongo/database";
import Stays from "@/mongo/database/models/stays.model";

export const getFeatured = async () => {
  try {
    await connectToDb();

    const stays = await Stays.find();
    return JSON.parse(JSON.stringify(stays));
  } catch (err) {
    console.log(err);
  }
};
