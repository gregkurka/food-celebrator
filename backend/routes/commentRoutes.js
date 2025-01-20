const express = require("express");
const {
  createComment,
  getCommentsByPhotoId,
  deleteCommentById,
} = require("../models/commentModel");

const router = express.Router();

// Create a new comment
router.post("/", async (req, res) => {
  const { userId, photoId, text } = req.body;
  try {
    const newComment = await createComment(userId, photoId, text);
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create comment" });
  }
});

// Get comments for a specific photo
router.get("/photo/:photoId", async (req, res) => {
  const { photoId } = req.params;
  try {
    const comments = await getCommentsByPhotoId(photoId);
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Delete a comment by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCount = await deleteCommentById(id);
    if (deleteCount === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

module.exports = router;
