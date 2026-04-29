// backend/controllers/authController.js

const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');
const authModel = require('../models/authModel');
require('dotenv').config();

// ─────────────────────────────────────────
// REGISTER
// POST /api/auth/register
// ─────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // 1. Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email and password are required.' });
    }

    // 2. Check if email already exists
    const existingEmail = await authModel.findUserByEmail(email);
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    // 3. Check if username already exists
    const existingUsername = await authModel.findUserByUsername(username);
    if (existingUsername) {
      return res.status(409).json({ message: 'Username already taken.' });
    }

    // 4. Hash the password — never store plaintext
    const salt         = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 5. Create the user
    const newUserId = await authModel.createUser(username, email, passwordHash, role || 'viewer');

    res.status(201).json({
      message: 'User registered successfully.',
      userId:  newUserId
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

// ─────────────────────────────────────────
// LOGIN
// POST /api/auth/login
// ─────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // 2. Check if user exists
    const user = await authModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // 3. Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      {
        userId:   user.user_id,
        username: user.username,
        role:     user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        userId:   user.user_id,
        username: user.username,
        email:    user.email,
        role:     user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};

module.exports = { register, login };