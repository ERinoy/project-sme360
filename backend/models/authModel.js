// backend/models/authModel.js

const db = require('../config/db');

// Find a user by email — used during login
const findUserByEmail = async (email) => {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0]; // returns undefined if not found
};

// Find a user by username — used to check duplicates during register
const findUserByUsername = async (username) => {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  return rows[0];
};

// Insert a new user into the database
const createUser = async (username, email, passwordHash, role = 'viewer') => {
  const [result] = await db.execute(
    'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [username, email, passwordHash, role]
  );
  return result.insertId; // returns the new user's ID
};

module.exports = { findUserByEmail, findUserByUsername, createUser };