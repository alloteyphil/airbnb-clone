"use server";

import { connectToDb } from "@/mongo/database";
import Stays from "@/mongo/database/models/stays.model";
import mongoose from "mongoose";

export const getSingleStay = async (id) => {
  try {
    await connectToDb();

    if (!id) {
      return null;
    }

    try {
      // Try to convert to ObjectId if it's a valid ObjectId string
      let queryId = id;
      if (mongoose.Types.ObjectId.isValid(id)) {
        queryId = new mongoose.Types.ObjectId(id);
      }

      const stay = await Stays.findById(queryId).populate("genre");

      if (!stay) {
        // Try finding by _id as string if ObjectId lookup fails
        const stayByString = await Stays.findOne({ _id: id }).populate("genre");
        if (stayByString) {
          return JSON.parse(JSON.stringify(stayByString));
        }
        return null;
      }

      return JSON.parse(JSON.stringify(stay)) || null;
    } catch (error) {
      console.error("Error finding stay:", error);
      return null;
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return null;
  }
};
