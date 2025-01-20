const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import routes
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const followRoutes = require("./routes/followRoutes");
const likeRoutes = require("./routes/likeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register routes
app.use("/users", userRoutes); // Routes for users
app.use("/comments", commentRoutes); // Routes for comments
app.use("/follows", followRoutes); // Routes for follows
app.use("/likes", likeRoutes); // Routes for likes
app.use("/auth", authRoutes); //Routes for authorization

// Default route
app.get("/", (req, res) => {
  res.send("Hello from Food Celebrator backend!");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
