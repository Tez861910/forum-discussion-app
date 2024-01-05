const { query } = require('../../../db');

async function handleAnnouncementCreate(req, res) {
  const { title, content, expiryDate, createdByUserId } = req.body;

  try {
    if (!title || !content || !createdByUserId) {
      console.log('Title, content, and createdByUserId are required');
      return res.status(400).json({ error: 'Title, content, and createdByUserId are required' });
    }

    const sql =
      'INSERT INTO Announcements (AnnouncementTitle, AnnouncementContent, ExpiryDate, CreatedByUserID) VALUES (?, ?, ?, ?)';
    const [result] = await query(sql, [title, content, expiryDate, createdByUserId]);

    if (result.affectedRows === 1) {
      console.log('Announcement created successfully');
      res.json({ message: 'Announcement created successfully' });
    } else {
      console.error('Announcement creation failed');
      res.status(500).json({ error: 'Announcement creation failed' });
    }
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ error: 'Announcement creation failed', details: error.message });
  }
}

module.exports = {
  handleAnnouncementCreate,
};
