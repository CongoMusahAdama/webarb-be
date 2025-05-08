import express from "express";
import {
  createBarber,
  getAllBarbers,
  getBarberById,
  updateBarber,
  getBarberPortfolio,
  deleteBarber,
  uploadDocuments,
  getBarbersByQuery
} from "../controllers/barberController.js";
import upload from "../middleware/upload.js";

import { authenticate } from "../middleware/authMiddleware.js";
import rbacMiddleware from "../middleware/rbacMiddleware.js";


const router = express.Router();

// ✅ Admin and Barber-only: Create a barber
router.post(
  "/create",authenticate, rbacMiddleware("admin", "barber"),
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "portfolio", maxCount: 5 },
    { name: "ghanaCardImage", maxCount: 1 },
    { name: "businessRegistration", maxCount: 1 },
    { name: "medicalReport", maxCount: 2  },
    //{ name: "styleImage", maxCount: 1 },
  ]),
  createBarber
);


// Public routes
router.get("/", getAllBarbers); // Get all barbers
router.get('/search', getBarbersByQuery);
router.get("/:id", getBarberById); // Get barber by ID
router.get("/portfolio/:id", getBarberPortfolio); // Get barber portfolio

// ✅ Admin and barber-only: Update and delete
router.put("/:id", authenticate, rbacMiddleware("admin", "barber"), updateBarber); // Update barber
router.delete("/:id", authenticate, rbacMiddleware("admin"), deleteBarber); // Delete barber


// Route to upload documents
router.post(
  '/:id/documents',
  upload.fields([
    { name: 'ghanaCardImage', maxCount: 1 },
    { name: 'businessRegistration', maxCount: 1 },
    { name: 'medicalReport', maxCount: 1 },
  ]),
  uploadDocuments
);

export default router;
