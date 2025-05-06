import { 
  getUserProfile,
  updateProfile as updateUserProfile,
  changePassword as changeUserPassword 
} from "../services/userService.js";

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await getUserProfile(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 404).json({ error: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await updateUserProfile(req.user.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(error.statusCode || 400).json({ error: error.message });
  }
};

// Change user password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Old and new password are required" });
    }

    const result = await changeUserPassword(req.user.id, oldPassword, newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 400).json({ error: error.message });
  }
};
