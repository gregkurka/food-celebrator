const db = require("../db"); // Import Knex instance

// Create a new comment
function createComment(userId, photoId, text) {
  return db("comments").insert(
    { user_id: userId, photo_id: photoId, text },
    "*"
  ); // Inserts and returns the new comment
}

// Get comments by photo ID
function getCommentsByPhotoId(photoId) {
  return db("comments").where({ photo_id: photoId }).select("*"); // Returns all comments for a specific photo
}

// Delete a comment by ID
function deleteCommentById(commentId) {
  return db("comments").where({ id: commentId }).del(); // Deletes the comment
}

// Get all comments
function getAllComments() {
  return db("comments").select("*"); // Returns all comments
}

module.exports = {
  createComment,
  getCommentsByPhotoId,
  deleteCommentById,
  getAllComments,
};
