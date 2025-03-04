const User = require("../models/User");
const bcrypt = require("bcrypt");

// Get user profile by ID
exports.getProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ["id", "fullName", "email", "phoneNumber", "profileImage", "role", "createdAt"],
  });

  if (!user) throw new Error("User not found");

  return user;
};

// Update user profile
exports.updateProfile = async (userId, updatedData) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  await user.update(updatedData);

  return user;
};

// Change user password
exports.changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error("Incorrect old password");

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await user.update({ password: hashedNewPassword });

  return { message: "Password updated successfully" };
};
