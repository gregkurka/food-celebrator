const express = require("express");
const {
  createLike,
  getLikesByPhotoId,
  deleteLike,
} = require("../models/likeModel");

const router = express.Router();

// Create a like
router.post("/", async (req, res) => {
  const { userId, photoId } = req.body;
  try {
    const newLike = await createLike(userId, photoId);
    res.status(201).json(newLike);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create like" });
  }
});

// Get likes for a specific photo
router.get("/photo/:photoId", async (req, res) => {
  const { photoId } = req.params;
  try {
    const likes = await getLikesByPhotoId(photoId);
    res.status(200).json(likes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch likes" });
  }
});

// Delete a like
router.delete("/", async (req, res) => {
  const { userId, photoId } = req.body;
  try {
    const deleteCount = await deleteLike(userId, photoId);
    if (deleteCount === 0) {
      return res.status(404).json({ error: "Like not found" });
    }
    res.status(200).json({ message: "Like deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete like" });
  }
});

module.exports = router;
