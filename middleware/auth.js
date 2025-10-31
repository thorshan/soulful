require('dotenv').config();
const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/TokenBlacklist');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ message: "No token provided, Authorization denied!"});
    const token = authHeader.split(" ")[1];

    try {
        // Check for expired tokens
        const blacklist = await TokenBlacklist.findOne({ token });
        if(blacklist) return res.status(401).json({ message: "Token is invalidated."});
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attached user to request
		const user = await User.findById(decoded.id);
        if(!user) return res.status(401).json({ message: "User not found."});
        req.user = user; // This user can be used in controller
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token!"})
    }
}

module.exports = auth;