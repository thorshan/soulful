const Order = require("../models/Order");
const socketEmitter = require("../socket/socketEmitter");
const Notification = require("../models/Notification");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error getting orders", error });
  }
};

// Create order
const createOrder = async (req, res) => {
  try {
    const { cart, deliAddress, deliContact, orderNumber } = req.body;

    const order = await Order.create({
      user: req.user._id,
      cart,
      deliAddress,
      deliContact,
      orderNumber,
    });

    // User notification
    const userNotification = await Notification.create({
      user: req.user._id,
      message: "You placed a new order.",
      type: "info",
    });

    await socketEmitter.notifyUser(req.user._id.toString(), {
      message: userNotification.message,
      type: "info",
      notificationId: userNotification._id,
      createdAt: userNotification.createdAt,
    });

    // Admin notification
    const adminNotification = await Notification.create({
      message: `${req.user?.name} placed an order. Order No. 「 ${orderNumber} 」`,
      type: "alert",
      user: null,
    });

    socketEmitter.notifyAdmins({
      message: adminNotification.message + ` Order No: ${orderNumber}`,
      type: "alert",
      notificationId: adminNotification._id,
      createdAt: adminNotification.createdAt,
    });

    res.json({ order, userNotification, adminNotification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Get order by ID
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) res.json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error getting order", error });
  }
};

// Get order by User
const getOrderByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.find({ user: id }).populate("user", "name email");
    if (!order) res.json({ message: "Cannot find user's order" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error getting user's order", error });
  }
};

// Update order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, cart, deliAddress, deliContact, orderNumber, orderStatus } =
      req.body;
    const existing = await Order.findById(id);
    if (!existing) res.json({ message: "Order not found" });
    const updateData = {
      user,
      cart,
      deliAddress,
      deliContact,
      orderNumber,
      orderStatus,
    };
    const order = await Order.findByIdAndUpdate(id, updateData);
    res.json({ message: "Order updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) res.json({ message: "Order not found" });
    await Order.findByIdAndDelete(order._id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrder,
  getOrderByUser,
  updateOrder,
  deleteOrder,
};
