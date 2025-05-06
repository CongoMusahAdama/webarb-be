import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import "./config/passport.js"; // Import and initialize Google strategy

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import barberRoutes from "./routes/barberRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors({
  //origin: "http://localhost:8000", // your frontend URL
  //credentials: true, // important for session cookies
}));

app.use(express.json());

// Session setup (before passport)
app.use(session({
  secret: process.env.SESSION_SECRET || "secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set to true if using HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/barbers", barberRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/payments", paymentRoutes);
app.use("/transactions", transactionRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
