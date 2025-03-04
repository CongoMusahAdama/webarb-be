const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const { getProfile, updateProfile, changePassword } = require ("../controllers/userController")
const router = express.Router();

router.get("/Profile", authenticate, getProfile);
router.put("/Profile", authenticate, updateProfile);
router.put("/Password", authenticate,  changePassword);


module.exports = router;