import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import rbacMiddleware from "../middleware/rbacMiddleware.js";
import * as paymentController from '../controllers/paymentController.js';


const router = express.Router();

router.post("/initialize", authenticate, rbacMiddleware("user"), paymentController.initializePayment);
router.get("/verify", authenticate, rbacMiddleware("user"), paymentController.verifyPayment);
router.post('/create-recipient', authenticate, rbacMiddleware("barber"), paymentController.createRecipient);

export default router;
