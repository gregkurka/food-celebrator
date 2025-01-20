const jwt = require("jsonwebtoken"); // For token generation
const {
  hashPassword,
  comparePasswords,
  createUser,
  getUserByEmail,
} = require("../models/userModel");

// Register a new user
async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user
    const newUser = await createUser(username, email, hashedPassword);

    // Send a success response (exclude sensitive data like password_hash)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser[0].id,
        username: newUser[0].username,
        email: newUser[0].email,
      },
    });
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Log in a user
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the entered password with the stored hash
    const isMatch = await comparePasswords(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Send the token and user info in the response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { register, login };
