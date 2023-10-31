const express = require('express');
const router = express.Router();

// Route to fetch additional data
router.get('/home/data', (req, res) => {
  // Handle the data retrieval logic here
  res.json({ message: 'Data retrieved successfully' });
});

module.exports = router;
