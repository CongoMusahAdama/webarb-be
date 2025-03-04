const jwt = require ("jsonwebtoken");
require("dotenv").config();


exports.authenticate = (req, res, next ) =>{
    const token = req.header("Authorization");
    if(!token) return res.status(401).json({ message: "Access Denied" });

    try{
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        res.status(403).json({ message: "Invalid token "});
    }
};

