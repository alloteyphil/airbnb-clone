import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose || { conn: null, promise: null };

export const connectToDb = async () => {
  if (cached.conn) {
    console.log("Connected to database");

    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error("Mongodb URI is missing. Please try again");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "airbnb-clone",
      bufferCommands: false,
    });

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.log("Connection to mongodb failed. Please try again", error);
  }

  return cached.conn;
};
