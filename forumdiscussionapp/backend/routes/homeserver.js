const express = require('express');
const router = express.Router();
const { query } = require('../db');
const { accessToken, verifyJwt } = require('../authvalid');

router.post('/refresh-token', verifyJwt, async (req, res) => {
  try {
    const newAccessToken = accessToken(req.user); 

    res.json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.error('Token refresh failed:', error);
    res.status(401).json({ error: 'Token refresh failed' });
  }
});

module.exports = router;
