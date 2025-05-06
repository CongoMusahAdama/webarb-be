import express from "express";
import {
  createBarber,
  getAllBarbers,
  getBarberById,
  updateBarber,
  getBarberPortfolio,
  deleteBarber
} from "../controllers/barberController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/create", upload.single("profileImage"), createBarber); // Create a barber
router.get("/", getAllBarbers); // Get all barbers
router.get("/:id", getBarberById); // Get barber by ID
router.put("/:id", updateBarber); // Update barber
router.get("/portfolio/:id", getBarberPortfolio); // Get barber portfolio
router.delete("/:id", deleteBarber); // Delete barber

export default router;
