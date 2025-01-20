const express = require("express");
const {
  getAllUsers,
  getUserById,
  deleteUserById,
} = require("../models/userModel");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Route to get a user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Protected route to get the current logged-in user's details
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching logged-in user:", err);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Route to delete a user by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCount = await deleteUserById(id);
    if (deleteCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
