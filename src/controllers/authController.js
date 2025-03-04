/**register, login, logout and  JWT */
const bcrypt = require ("bcrypt");
const jwt = require('jsonwebtoken');
const User = require ("../models/User");
//const redisClient = require("../config/redis"); // TODO:  Redis is set up
require("dotenv").config();

//register
exports.register = async(req, res ) =>{
    try{
        const { fullName, email, phoneNumber, profileImage, password, role } = req.body;

        const existingUser = await User.findOne({ where: { email }});
        if(existingUser) return res.status(404).json({ message: "Email already in use" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ fullName, email, phoneNumber, profileImage, password: hashedPassword, role })

        const token = jwt.sign({ id: newUser.id, role: newUser.role}, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ message: "User registered successfully", token, user: newUser });
    }catch (error){
        res.status(500).json({message: "Error registering a user", error: error.message })
    }
};


//login 
exports.login = async (req,res) =>{
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email} });
        if(!user) return res.status(400).json({ message: "Invalid user credentials, please try again" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid user credentials, please try again "});

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ message: "Login successfully", token, user });
       }catch(error){
        res.status(500).json({ message: "Error loggin in", error: error.message });
       }
};


//logout
exports.logout = async (req, res) => {
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
/*exports.logout = async (req, res) => {
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
}; */