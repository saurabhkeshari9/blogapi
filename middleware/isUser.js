const User = require("../models/user");
const { getTokenFromHeader, verifyToken } = require("../helpers/verifytoken");

const isUser = async (req, res, next) => {
  try {
    // Extract & verify token
    const token = getTokenFromHeader(req);
    const decodedUser = verifyToken(token);

    if (!decodedUser || !decodedUser.id) {
      return res.status(403).json({ statusCode: 403, message: "Invalid or expired token." });
    }

    // Find user in database
    const user = await User.findById(decodedUser.id);
    if (!user) {
      return res.status(403).json({ statusCode: 404, message: "User not found." });
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({ statusCode: 403, message: "Access denied. Your account is blocked." });
    }

    // Attach user details to request
    req.userAuth = user;
    next();

  } catch (error) {
    console.error("User Middleware Error:", error.message);
    return res.status(500).json({ statusCode: 500, message: "Internal server error." });
  }
};

module.exports = isUser;
