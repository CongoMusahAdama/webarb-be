import express from "express";
import upload from "../middleware/upload.js"; 
import { authenticate } from "../middleware/authMiddleware.js";
import rbacMiddleware from "../middleware/rbacMiddleware.js"; 
import * as bookingController from "../controllers/bookingController.js"; 

const router = express.Router();

router.post(
  "/",
  authenticate,
  rbacMiddleware("user"),
  upload.fields([
     { name: "styleImage", maxCount: 3 },
  ]),
  bookingController.createBooking
);

router.get(
  "/user/:userId",
  authenticate,
  rbacMiddleware("user"),
  bookingController.getUserBookings
);

router.get(
  "/barber/:barberId",
  authenticate,
  rbacMiddleware("barber"),
  bookingController.getBarberBookings
);

router.put(
  "/:bookingId/status",
  authenticate,
  rbacMiddleware("barber"),
  bookingController.updateBookingsStatus
);

router.put(
  "/:bookingId/reschedule",
  authenticate,
  rbacMiddleware("user"),
  bookingController.rescheduleBooking
);

export default router;
