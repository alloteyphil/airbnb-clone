"use server";

import { connectToDb } from "@/mongo/database";
import Genre from "@/mongo/database/models/genre.models";

// Get all genre
export const getAllGenres = async () => {
  try {
    await connectToDb();
    const genres = await Genre.find();
    return JSON.parse(JSON.stringify(genres)) || [];
  } catch (err) {
    console.log(err);
    return [];
  }
};
