const express = require("express");
const upload = require("../middleware/upload"); // Middleware for file upload
const { authenticate } = require("../middleware/authMiddleware");
const rbacMiddleware = require("../middleware/rbacMiddleware"); // RBAC middleware

const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.post("/", authenticate, rbacMiddleware("user"), upload.single("styleImage"), bookingController.createBooking); // Users and Admins can create bookings

router.get("/user/:userId", authenticate, rbacMiddleware("user"), bookingController.getUserBookings); // Users can retrieve their own bookings
router.get("/barber/:barberId", authenticate, rbacMiddleware("barber"), bookingController.getBarberBookings); // Barbers can see their assigned bookings
router.patch("/:bookingId/status", authenticate, rbacMiddleware("barber"), bookingController.updateBookingsStatus); // Barbers and Admins can modify bookings

router.patch("/:bookingId/reschedule", authenticate, rbacMiddleware("user"), bookingController.rescheduleBooking); // Users, Barbers, and Admins can reschedule bookings

module.exports = router;
