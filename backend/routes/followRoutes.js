const express = require("express");
const {
  createFollow,
  getFollowersByUserId,
  getFollowingByUserId,
  deleteFollow,
} = require("../models/followModel");

const router = express.Router();

// Create a follow relationship
router.post("/", async (req, res) => {
  const { followerId, followedId } = req.body;
  try {
    const newFollow = await createFollow(followerId, followedId);
    res.status(201).json(newFollow);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create follow relationship" });
  }
});

// Get all followers of a user
router.get("/followers/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const followers = await getFollowersByUserId(userId);
    res.status(200).json(followers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch followers" });
  }
});

// Get all users a user is following
router.get("/following/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const following = await getFollowingByUserId(userId);
    res.status(200).json(following);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch following users" });
  }
});

// Delete a follow relationship
router.delete("/", async (req, res) => {
  const { followerId, followedId } = req.body;
  try {
    const deleteCount = await deleteFollow(followerId, followedId);
    if (deleteCount === 0) {
      return res.status(404).json({ error: "Follow relationship not found" });
    }
    res
      .status(200)
      .json({ message: "Follow relationship deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete follow relationship" });
  }
});

module.exports = router;
