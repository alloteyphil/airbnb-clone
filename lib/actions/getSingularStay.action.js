"use server";

import { connectToDb } from "@/mongo/database";
import Stays from "@/mongo/database/models/stays.model";

export const getSingleStay = async (id) => {
  try {
    await connectToDb();
    try {
      const stay = await Stays.findById(id);
      return JSON.parse(JSON.stringify(stay));
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
