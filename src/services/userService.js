import User from "../models/User.js";
import bcrypt from "bcrypt";

//Get user profile
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId)
    .select("fullname email phoneNumber role createdAt");

  if (!user) throw new Error("User not found");

  return user;
};


// Update user profile
export const updateProfile = async (userId, updatedData) => {
  // Fields the user is allowed to update
  const allowedFields = ["fullname", "email", "phoneNumber"];

  // Filter only allowed fields from updatedData
  const sanitizedData = {};
  for (const key of allowedFields) {
    if (updatedData[key] !== undefined) {
      sanitizedData[key] = updatedData[key];
    }
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    sanitizedData,
    { new: true, runValidators: true }
  );

  if (!updatedUser) throw new Error("User not found");

  return updatedUser;
};



// Change user password
export const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Check if old password matches
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error("Old password is incorrect");
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();

  return { message: "Password changed successfully" };
};
