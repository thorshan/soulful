require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Database connection
const connectToDb = require("./config/database");
connectToDb();

// API
app.use(
  cors({
    origin:
      "https://3000-firebase-test-1760334247704.cluster-fkltigo73ncaixtmokrzxhwsfc.cloudworkstations.dev",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Route Config
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

// App Routes
app.use("/api", authRoute);
app.use("/api", userRoute);

// Server Processing
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`)
);
