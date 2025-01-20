const db = require("../db"); // Import Knex instance

// Create a like
function createLike(userId, photoId) {
  return db("likes").insert({ user_id: userId, photo_id: photoId }, "*"); // Inserts and returns the new like
}

// Get likes by photo ID
function getLikesByPhotoId(photoId) {
  return db("likes").where({ photo_id: photoId }).select("user_id"); // Returns all users who liked the photo
}

// Delete a like
function deleteLike(userId, photoId) {
  return db("likes").where({ user_id: userId, photo_id: photoId }).del(); // Deletes the like
}

// Get all likes
function getAllLikes() {
  return db("likes").select("*"); // Returns all likes
}

module.exports = {
  createLike,
  getLikesByPhotoId,
  deleteLike,
  getAllLikes,
};
