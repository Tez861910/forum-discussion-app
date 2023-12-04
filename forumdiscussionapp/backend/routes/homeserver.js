const express = require('express');
const router = express.Router();
const { query } = require('../db');
const multer = require('multer');
const path = require('path');
const { createToken, verifyJwt, createRefreshToken, verifyRefreshToken } = require('../authvalid');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
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

// Endpoint to refresh access token
router.post('/refresh-token', verifyRefreshToken);

module.exports = router;
