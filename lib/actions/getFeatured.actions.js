"use server";

import { connectToDb } from "@/mongo/database";
import Stays from "@/mongo/database/models/stays.model";

export const getFeatured = async () => {
  try {
    await connectToDb();

    const stays = await Stays.find().populate("genre");
    const result = JSON.parse(JSON.stringify(stays)) || [];
    return result;
  } catch (err) {
    console.error("Error fetching featured stays:", err);
    // Return empty array instead of throwing to prevent page crash
    return [];
  }
};
