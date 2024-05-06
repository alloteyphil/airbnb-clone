"use server";

import { connectToDb } from "@/mongo/database";
import Genre from "@/mongo/database/models/genre.models";
import Stays from "@/mongo/database/models/stays.model";

export const getSingleStay = async (id) => {
  try {
    await connectToDb();
    try {
      const stay = await Stays.findById(id);
      try {
        const genre = await Genre.findById(stay.genre);
        return JSON.parse(JSON.stringify({ stay, genre }));
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
