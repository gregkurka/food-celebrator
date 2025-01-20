const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from Authorization header
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Add the user info to the request object
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = { authenticateToken };
