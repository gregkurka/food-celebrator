const db = require("../db"); // Import Knex instance

// Create a follow relationship
function createFollow(followerId, followedId) {
  return db("follows").insert(
    { follower_id: followerId, followed_id: followedId },
    "*"
  ); // Inserts and returns the new follow relationship
}

// Get followers for a user
function getFollowersByUserId(userId) {
  return db("follows").where({ followed_id: userId }).select("follower_id"); // Returns all users following the specified user
}

// Get users a user is following
function getFollowingByUserId(userId) {
  return db("follows").where({ follower_id: userId }).select("followed_id"); // Returns all users the specified user is following
}

// Delete a follow relationship
function deleteFollow(followerId, followedId) {
  return db("follows")
    .where({ follower_id: followerId, followed_id: followedId })
    .del(); // Deletes the follow relationship
}

module.exports = {
  createFollow,
  getFollowersByUserId,
  getFollowingByUserId,
  deleteFollow,
};
