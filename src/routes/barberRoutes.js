const express = require("express");
const barberController = require("../controllers/barberController");
const upload = require("../middleware/upload"); 

const router = express.Router();

router.post("/create", upload.single("profileImage"),barberController.createBarber); // Create a barber
router.get("/", barberController.getAllBarbers); // Get all barbers
router.get("/:id", barberController.getBarberById); // Get barber by ID
router.put("/:id", barberController.updateBarber); // Update barber
router.get("/portfolio/:id", barberController.getBarberPortfolio); // Get barber portfolio
router.delete("/:id", barberController.deleteBarber); // Delete barber

module.exports = router;
