"use server";

import { connectToDb } from "@/mongo/database";
import Stays from "@/mongo/database/models/stays.model";

export const getDestinationStays = async (city) => {
  try {
    await connectToDb();
    try {
      const stays = await Stays.find({ city });
      return JSON.parse(JSON.stringify(stays));
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
