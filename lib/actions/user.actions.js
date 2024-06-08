"use server";

import { connectToDb } from "@/mongo/database";
import User from "@/mongo/database/models/user.model";
import { revalidatePath } from "next/cache";

//create user action
export const createUser = async (user) => {
  try {
    await connectToDb();

    const newUser = User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};

//get user action
export const getUser = async (userId) => {
  try {
    await connectToDb();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};

export const getUserByClerk = async (clerkId) => {
  try {
    await connectToDb();

    const user = await User.findOne({ clerkId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};

//update user action
export const updateUser = async (clerkId, user) => {
  try {
    await connectToDb();

    const updatedUser = await User.findOneAndUpdate((clerkId, user), {
      new: true,
    });

    if (!updatedUser) throw new Error("User failed to update");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
  }
};

//delete user action
export const deleteUser = async (clerkId) => {
  try {
    await connectToDb();

    const userToDelete = await User.findOneAndDelete(clerkId);

    if (!userToDelete) throw new Error("User not found");

    const deletedUser = await User.findOneAndDelete(userToDelete._id);

    revalidatePath("/");

    return deleteUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.log(error);
  }
};
