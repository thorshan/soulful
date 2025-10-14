const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generate token
const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "1d" }
  );
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials." });
    const token = createToken(user);
    res.json({
      message: "Login successful.",
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Register
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      name,
      email,
      hashedPass,
      role,
    });
    if (user)
      return res
        .status(401)
        .json({ message: "User with this email address already exist." });
    const token = createToken(user);
    res.json({
      message: "User registered successfully.",
      user: {
        id: user._id,
        email: user.email,
        password: user.hashedPass,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to register.", error: err.message });
  }
};

// Logout
const logout = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(400).json({ message: "No token provided" });
  try {
    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000);
    await TokenBlacklist.create({ token, expiresAt });
    res.json({ message: "Logout successfully, token invalidated" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
};

module.exports = {
  login,
  register,
  logout,
};
