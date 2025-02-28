const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Admin = require("../models/adminmodel");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(403).json({ statusCode: 403, message: "Access denied. No token provided." });
    }

    console.log("Received Token:", token);
    
    if (!token || typeof token !== "string") {
      return res.status(403).json({ statusCode: 403, message: "Access denied. No valid token provided." });
    }

    
    const formattedToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    const decoded = jwt.verify(formattedToken, process.env.JWT_SECRET);
    if (!decoded || !decoded.id || !decoded.email) {
      return res.status(403).json({ statusCode: 403, message: "Invalid token structure." });
    }

    console.log("Decoded Token:", decoded);

  
    if (decoded.email === process.env.ADMIN_EMAIL) {
      const admin = await Admin.findById(decoded.id);
      if (!admin) {
        return res.status(403).json({ statusCode: 403, message: "Invalid token. Admin not found." });
      }
      req.admin = admin;
      
      console.log("Admin:", admin);
    }else {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(403).json({ statusCode: 403, message: "Invalid token. User not found." });
      }
      if (user.isBlocked) {
        return res.status(403).json({ statusCode: 403, message: "Your account is blocked." });
    }
      req.user = user;
    }

    next();
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

module.exports = authMiddleware;
