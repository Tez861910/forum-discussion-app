const express = require('express');
const router = express.Router();
const { query } = require('../db');
const { createToken, verifyPassword } = require('../authvalid');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      console.log('Email and password are required.');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = `
      SELECT users.*
      FROM users
      WHERE users.UserEmail = ?
    `;

    const queryResult = await query(sql, [email]);
    console.log('Query Result:', queryResult);

    if (!Array.isArray(queryResult) || queryResult.length === 0) {
      console.log('No user found with this email: ' + email);
      return res.status(401).json({ error: 'No user found with this email' });
    }

    const userData = queryResult[0];

    console.log('User Data:', userData);

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

    const token = createToken(userData.UserID, userData.UserEmail, userData.RoleID);

    console.log('Login successful for email: ' + email);

    res.json({
      success: true,
      message: 'Login successful',
      userId: userData.UserID,
      roleId: userData.RoleID,
      token: token,
    });
  } catch (error) {
    console.error('Login failed with error:', error);
    res.status(500).json({ error: 'Login Failed', details: error.message });
  }
});

module.exports = router;
