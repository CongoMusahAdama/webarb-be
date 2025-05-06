import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile, changePassword } from "../controllers/userController.js";

const router = express.Router();

router.get("/Profile", authenticate, getProfile);
router.put("/Profile", authenticate, updateProfile);
router.put("/Password", authenticate, changePassword);

export default router;
