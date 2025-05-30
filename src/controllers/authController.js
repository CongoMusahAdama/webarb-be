import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
//import redisClient from "../config/redis.js"; // TODO: Redis is set up
import "dotenv/config";
import Barber from "../models/Barber.js"; // import your Barber model
import { generateRefreshToken, generateToken } from "../utils/jwt.js";

//register
export const register = async (req, res) => {
  try {
    console.log("Register request body:", req.body);
    const {
      fullname,
      email,
      phoneNumber,
      password,
      role,
      ghanaCardNumber,
      location,
      specialization,
      yearsOfExperience,
      profileImage,
    } = req.body;

    // Validate core fields
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      fullname,
      email: email.trim().toLowerCase(),
      phoneNumber: Number(phoneNumber),
      password: hashedPassword,
      role,
    });

    // Declare barberProfile in scope
    let barberProfile = null;

    // If user is a barber, create a linked Barber record
    if (role === "barber") {
      if (!ghanaCardNumber || !location || !specialization || !yearsOfExperience) {
        return res.status(400).json({ message: "Missing barber-specific fields" });
      }

      // Create Barber profile
      barberProfile = await Barber.create({
        userId: newUser._id,
        fullName: fullname,
        email: email.trim().toLowerCase(),
        phoneNumber: Number(phoneNumber),
        ghanaCardNumber,
        location,
        specialization,
        yearsOfExperience: Number(yearsOfExperience),
      });
    }
    // Generate token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    // Respond
    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser,
      barber: barberProfile,
    });

  } catch (error) {
    console.error("Error in register:", error);
    return res.status(500).json({ message: "Error registering user", error: error.message });
  }
}; 



//login 
export const login = async (req, res) => {
    try {
        const email = req.body.email.trim().toLowerCase();  //triming the email to lower-case
        const { password } = req.body;

        //lets check if email already existed
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid user credentials, please try again" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid user credentials, please try again" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Exclude password from response
        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({
            message: "Login successfully",
            token,
            user: userWithoutPassword,
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};



//logout
export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        // Here, we won't store the token in Redis; instead, we'll just tell the client to remove it
        res.json({ message: "Logout successful. Please remove the token on the client side." });
    } catch (error) {
        res.status(500).json({ message: "Error logging out", error: error.message });
    }
};

//using Redis for token blacklisting during logout to prevent a user from using the same JWT token after logging out.
/*
export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token
        if (!token) return res.status(400).json({ message: "No token provided" });

        // Ensure Redis is connected
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }

        // Store token in Redis blacklist with expiration (7 days)
        await redisClient.set(token, "blacklisted", { EX: 604800 });

        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out", error: error.message });
    }
};
*/