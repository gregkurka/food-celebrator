const db = require("../db"); // Import the Knex instance
const bcrypt = require("bcrypt"); // For password hashing and comparison

// Create a new user
function createUser(username, email, passwordHash) {
  return db("users").insert(
    { username, email, password_hash: passwordHash },
    "*"
  ); // Inserts and returns the inserted row
}

// Get a user by ID
function getUserById(userId) {
  return db("users").where({ id: userId }).first(); // Fetches the first matching row
}

// Get all users
function getAllUsers() {
  return db("users").select("*"); // Select all rows
}

// Get a user by email (for authentication)
function getUserByEmail(email) {
  return db("users").where({ email }).first(); // Fetches the first matching row by email
}

// Delete a user by ID
function deleteUserById(userId) {
  return db("users").where({ id: userId }).del(); // Deletes the row
}

// Hash a password before saving it
async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds for bcrypt
  return await bcrypt.hash(password, saltRounds);
}

// Compare a plain-text password with a hashed password
async function comparePasswords(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  getUserByEmail,
  deleteUserById,
  hashPassword,
  comparePasswords,
};
