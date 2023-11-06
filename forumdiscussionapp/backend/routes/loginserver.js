const express = require('express');
const router = express.Router();
const { query } = require('../db');
const { createToken, verifyPassword, verifyJwt } = require('../authvalid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const JWT_SECRET = 'fg87234tgf8723gf82g498318u308gn8u';
const SALT_ROUNDS = 10;

router.use(cookieParser());

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      console.log('Email and password are required.');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = 'SELECT * FROM users WHERE UserEmail = ?';
    const queryResult = await query(sql, [email]);

    if (!Array.isArray(queryResult) || queryResult.length === 0) {
      console.log('No user found with this email: ' + email);
      return res.status(401).json({ error: 'No user found with this email' });
    }

    const userData = queryResult[0];

    if (!userData || !userData.UserPassword) {
      console.log('User data is incomplete.');
      return res.status(401).json({ error: 'User data is incomplete' });
    }

    const hashedPassword = userData.UserPassword;

    const isPasswordValid = await verifyPassword(password, hashedPassword);

    if (!isPasswordValid) {
      console.log('Incorrect password for email: ' + email);
      return res.status(401).json({ error: 'Incorrect password' });
    }

    if (userData.RoleID === undefined || userData.RoleID === null) {
      console.log('Role ID is not defined in user data.');
      return res.status(401).json({ error: 'Role ID is not defined in user data' });
    }

    if (userData.CourseID === undefined || userData.CourseID === null) {
      console.log('Course ID is not defined in user data.');
      return res.status(401).json({ error: 'Course ID is not defined in user data' });
    }

    if (userData.UserID === undefined || userData.UserID === null) {
      console.log('User ID is not defined in user data.');
      return res.status(401).json({ error: 'User ID is not defined in user data' });
    }

    const token = createToken(userData.UserID, userData.UserEmail, userData.RoleID, userData.CourseID);
    const refreshToken = jwt.sign({ userId: userData.UserID }, JWT_SECRET, { expiresIn: '7d' });

    console.log('Login successful for email: ' + email);

    // Set tokens as cookies
    res.cookie('token', token, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

   
  res.json({
    success: true,
    message: 'Login successful',
    userId: userData.UserID, 
    roleId: userData.RoleID,
    courseId: userData.CourseID,
    token: token, 
  });
  } catch (error) {
    console.error('Login failed with error:', error);
    res.status(500).json({ error: 'Login Failed', details: error.message });
  }
});

router.post('/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token is missing' });
  }

  jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Error verifying refresh token:', err);
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    // Generate a new access token
    const newToken = createToken(decoded.userId, '', '', '');

    // Set the new access token as a cookie
    res.cookie('token', newToken, { httpOnly: true });

    res.json({
      success: true,
      message: 'Token refreshed',
      userId: decoded.userId,
      roleId: '',
      courseId: '',
      accessToken: newToken,
    });
  });
});


module.exports = router;
