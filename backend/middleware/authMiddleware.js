// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

// ─────────────────────────────────────────
// VERIFY TOKEN
// Attach this to any route that requires login
// ─────────────────────────────────────────
const verifyToken = (req, res, next) => {
  // Token must be sent as: Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];
  const token      = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, username, role }
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// ─────────────────────────────────────────
// VERIFY ADMIN
// Attach this after verifyToken for admin-only routes
// ─────────────────────────────────────────
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };