const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Make sure this path is correct

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Assuming JWT authentication
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set
        req.user = await User.findById(decoded.id); // Attach user to request

        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }

        next();
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};

module.exports = auth;


