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

    // Convert id to string and handle URL encoding/decoding
    let idString = String(id).trim();
    
    // Decode URL-encoded characters if present
    try {
      idString = decodeURIComponent(idString);
    } catch {
      // If decoding fails, use original string
    }

    if (!idString) {
      return null;
    }

    try {
      let stay = null;

      // Strategy 1: Try with ObjectId if valid (most common case)
      if (mongoose.Types.ObjectId.isValid(idString)) {
        try {
          const objectId = new mongoose.Types.ObjectId(idString);
          stay = await Stays.findById(objectId).populate("genre").lean();
          
          if (stay) {
            return JSON.parse(JSON.stringify(stay));
          }
        } catch {
          // Continue to next strategy
        }
      }

      // Strategy 2: Try finding by _id as string (for string IDs)
      if (!stay) {
        try {
          stay = await Stays.findOne({ _id: idString }).populate("genre").lean();
          
          if (stay) {
            return JSON.parse(JSON.stringify(stay));
          }
        } catch {
          // Continue to next strategy
        }
      }

      // Strategy 3: Try with ObjectId using $or query (handles both ObjectId and string)
      if (!stay) {
        try {
          const queries = [];
          
          // Add ObjectId query if valid
          if (mongoose.Types.ObjectId.isValid(idString)) {
            queries.push({ _id: new mongoose.Types.ObjectId(idString) });
          }
          
          // Add string query
          queries.push({ _id: idString });
          
          if (queries.length > 0) {
            stay = await Stays.findOne({ $or: queries }).populate("genre").lean();
            
            if (stay) {
              return JSON.parse(JSON.stringify(stay));
            }
          }
        } catch {
          // All strategies failed
        }
      }

      return null;
    } catch {
      return null;
    }
  } catch {
    return null;
  }
};
