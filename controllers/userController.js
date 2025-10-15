const User = require("../models/User");

// Get all users
const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ error: err.message });
  }
};

// Get user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create user
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPass,
      role,
    });
    if (user)
      return res
        .status(401)
        .json({ message: "User with this email address already exist." });
    const token = createToken(user);
    res.json({
      message: "User added successfully.",
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
      .json({ message: "Failed to add user.", error: err.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    // Check the user
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update the user
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (role) user.role = role;

    // Save user
    await user.save();
    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ message: "User not found" });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  allUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
