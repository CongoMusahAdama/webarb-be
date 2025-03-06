const express = require("express");
const upload = require("../middleware/upload"); // Middleware for file upload

const bookingController = require("../controllers/bookingController");
//const authMiddleware = require("../middlewares/authMiddleware"); 

const router = express.Router();

router.post("/",   upload.single("styleImage"), bookingController.createBooking);
router.get("/user/:userId", bookingController.getUserBookings);
router.get("/barber/:barberId", bookingController.getBarberBookings);
router.put("/:bookingId/status", bookingController.updateBookingsStatus);
router.put("/:bookingId/reschedule", bookingController.rescheduleBooking); // Reschedule route


module.exports = router;
