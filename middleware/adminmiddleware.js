module.exports = (req, res, next) => {
    if (!req.admin) {
      return res.status(403).json({ statusCode: 400, message: "Access denied. Admin only." });
    }
    next();
  };
  