import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import rbacMiddleware from "../middleware/rbacMiddleware.js";
import * as transactionController from "../controllers/TransactionController.js";

const router = express.Router();

// Withdrawal routes
router.post("/withdrawals/process",authenticate, rbacMiddleware("barber"),transactionController.processWithdrawal);

router.post("/withdrawals/verify", authenticate, rbacMiddleware("barber"),transactionController.verifyWithdrawal);

router.post("/withdrawals/finalize", authenticate, rbacMiddleware("barber"), transactionController.finalizeWithdrawal);

// Admin transaction management
router.get("/admin/transactions",authenticate, rbacMiddleware("admin"),transactionController.getAllTransactions);

router.get("/admin/transactions/:userId",authenticate, rbacMiddleware("admin"),transactionController.getUserTransactions);

router.put("/admin/transactions/:transactionId/status", authenticate, rbacMiddleware("admin"), transactionController.updateTransactionStatus);

// User transaction history
router.get("/users/:userId/transactions", authenticate, rbacMiddleware("user"), transactionController.getUserTransactions);

export default router;
