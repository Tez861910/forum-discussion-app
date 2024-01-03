const { query } = require('../../db');

async function handleAnnouncementUpdate(req, res) {
  const { announcementId } = req.params;
  const { title, content, expiryDate, createdByUserId } = req.body;

  try {
    if (!title || !content || !createdByUserId) {
      console.log('Title, content, and createdByUserId are required');
      return res.status(400).json({ error: 'Title, content, and createdByUserId are required' });
    }

    const sql =
      'UPDATE Announcements SET AnnouncementTitle = ?, AnnouncementContent = ?, ExpiryDate = ?, CreatedByUserID = ? WHERE AnnouncementID = ?';
    const [result] = await query(sql, [title, content, expiryDate, createdByUserId, announcementId]);

    if (result.affectedRows === 1) {
      console.log('Announcement updated successfully');
      res.json({ message: 'Announcement updated successfully' });
    } else {
      console.error('Announcement update failed');
      res.status(500).json({ error: 'Announcement update failed' });
    }
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({ error: 'Announcement update failed', details: error.message });
  }
}

module.exports = {
  handleAnnouncementUpdate,
};
