 const express = require('express');
const router = express.Router();
const db = require('../db');
const { createToken, hashPassword, verifyPassword } = require('../authvalid');
const jwt = require('jsonwebtoken');

 // Login Route

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = 'SELECT * FROM users WHERE UserEmail = ?';
    const queryResult = await db.query(sql, [email]);

    if (!Array.isArray(queryResult) || queryResult.length === 0) {
      return res.status(401).json({ error: 'No user found with this email' });
    }

    const userData = queryResult[0][0];

    if (!userData || !userData.UserPassword) {
      return res.status(401).json({ error: 'User data is incomplete' });
    }

    const hashedPassword = userData.UserPassword;

    const isPasswordValid = await verifyPassword(password, hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Create a payload with user ID, email, and role
    const payload = {
      userId: userData.UserID,
      email: userData.UserEmail,
      role: userData.RoleID,
    };

    // Create and send a JWT token
    const token = createToken(payload);

    res.json({ success: true, message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login Failed', details: error.message });
  }
});

 // Signup Route
router.post('/signup', async (req, res) => {
// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password, roleId, courseId } = req.body;

  // Log the incoming request body for debugging
  console.log('Incoming Signup Request:', req.body);

  try {
    if (!name || !email || !password || !roleId || !courseId) {
      // Log validation failure
      console.log('User data is missing:', req.body);
      return res.status(400).json({ error: 'Missing user data' });
    }

    const hashedPassword = await hashPassword(password);

    const roleQuery = 'SELECT RoleID FROM roles WHERE RoleID = ?';

    // Log the role query for debugging
    console.log('Role Query:', roleQuery);

    const [roleResults] = await db.query(roleQuery, [roleId]);

    if (!Array.isArray(roleResults) || roleResults.length === 0) {
      // Log invalid role
      console.log('Invalid role:', roleId);
      return res.status(400).json({ error: 'Invalid role' });
    }

    const courseQuery = 'SELECT CourseID FROM courses WHERE CourseID = ?';
    
    // Log the course query for debugging
    console.log('Course Query:', courseQuery);

    const [courseResults] = await db.query(courseQuery, [courseId]);

    if (!Array.isArray(courseResults) || courseResults.length === 0) {
      // Log invalid course
      console.log('Invalid course:', courseId);
      return res.status(400).json({ error: 'Invalid course' });
    }

    const sql = `
      INSERT INTO users (UserName, UserEmail, UserPassword, RoleID, CourseID)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [name, email, hashedPassword, roleId, courseId];

    const [insertResult] = await db.query(sql, values);

    if (insertResult.affectedRows === 1) {
      // Log successful user registration
      console.log('User registered successfully:', email);

      // Create a payload with user ID, email, and role
      const payload = {
        userId: insertResult.insertId,
        email,
        role: roleId,
      };

      // Create a JWT token with the payload
      const token = createToken(payload);

      res.json({ message: 'User registered successfully', token });
    } else {
      // Log user registration failure
      console.log('User registration failed:', email);
      res.status(500).json({ error: 'User registration failed' });
    }
  } catch (error) {
    // Log server-side error
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Signup failed', details: error.message });
  }
});

module.exports = router;
