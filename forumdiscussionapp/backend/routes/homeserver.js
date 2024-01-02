const express = require('express');
const router = express.Router();
const { query } = require('../db');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken'); 
const { verifyRefreshToken, createToken } = require('../authvalid');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
  console.log('Upload avatar route hit');
  const filePath = req.file.path;

  try {
    const [rows, fields] = await query(
      'UPDATE Users SET AvatarPath = ? WHERE UserID = ?',
      [filePath, req.body.userId]
    );

    res.json({ message: 'Avatar uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the avatar.' });
  }
});

// Updated route for token refresh
router.post('/refresh-token', verifyRefreshToken, async (req, res) => {
  try {

    // Generate a new access token
    const newAccessToken = createToken(req.userId, req.email, req.roleId);

    res.json({ access_token: newAccessToken });
  } catch (err) {
    console.error('Error refreshing token:', err);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

module.exports = router;
