const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);

// Serve frontend build (React or static files)
app.use(express.static(path.join(__dirname, "frontend/build")));

// Catch-all route to serve frontend for any other route
// Fixed for path-to-regexp / router compatibility
app.get("/:all(.*)", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
