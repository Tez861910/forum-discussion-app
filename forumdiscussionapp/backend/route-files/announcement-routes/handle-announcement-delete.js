const { query } = require('../../db');

async function handleAnnouncementDelete(req, res) {
  const { announcementId } = req.params;

  try {
    const sql = 'DELETE FROM Announcements WHERE AnnouncementID = ?';
    const [result] = await query(sql, [announcementId]);

    if (result.affectedRows === 1) {
      console.log('Announcement deleted successfully');
      res.json({ message: 'Announcement deleted successfully' });
    } else {
      console.error('Announcement deletion failed');
      res.status(500).json({ error: 'Announcement deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ error: 'Announcement deletion failed', details: error.message });
  }
}

module.exports = {
  handleAnnouncementDelete,
};
