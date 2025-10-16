require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Database connection
const connectToDb = require("./config/database");
connectToDb();

// API
app.use(cors());

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route Config
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const brandRoute = require("./routes/brandRoute");
const categoryRoute = require("./routes/categoryRoute");
const itemRoute = require("./routes/itemRoute");

// App Routes
app.use("/api", authRoute); // Login/Logout/Register
app.use("/api", userRoute); // User Route
app.use("/api", brandRoute); // Brand Route
app.use("/api", categoryRoute); // Category Route
app.use("/api", itemRoute); // Item Route

// Server Processing
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`)
);