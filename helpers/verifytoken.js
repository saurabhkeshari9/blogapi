const jwt = require("jsonwebtoken");
require("dotenv").config();


const getTokenFromHeader = (req) => {
  const token = req.header("Authorization");
  if (!token) return res.status(403).json({ statusCode: 403, message: "Access denied. No token provided." });;
  return token.startsWith("Bearer ") ? token.split(" ")[1] : token;
};


const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

module.exports = { getTokenFromHeader, verifyToken };
