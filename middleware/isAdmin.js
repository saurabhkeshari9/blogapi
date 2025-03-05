const Admin = require("../models/adminmodel");
const { getTokenFromHeader, verifyToken } = require("../helpers/verifytoken");

const isAdmin = async (req, res, next) => {
    try {
        // Extract token
        const token = getTokenFromHeader(req);
        
        // Verify token
        const decoded = verifyToken(token);
        if (!decoded || !decoded.id) {
            return res.status(403).json({ statusCode: 403, message: "Invalid or expired token." });
        }

        console.log("Decoded Token:", decoded);

        // Check if user is an Admin
        const admin = await Admin.findById(decoded.id);
        if (!admin) {
            return res.status(403).json({ statusCode: 403, message: "Access denied. Admin not found." });
        }

        // Attach admin details to request
        req.admin = admin;
        next();
        
    } catch (error) {
        console.error("Admin Middleware Error:", error.message);
        return res.status(500).json({ statusCode: 500, message: "Internal server error." });
    }
};

module.exports = isAdmin;
