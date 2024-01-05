const { query } = require('../../../db');

async function handleImageDelete(req, res) {
  const { imageId } = req.params;

  try {
    const sql = 'DELETE FROM EventImages WHERE ImageID = ?';
    const [result] = await query(sql, [imageId]);

    if (result.affectedRows === 1) {
      console.log('Event image deleted successfully');
      res.json({ message: 'Event image deleted successfully' });
    } else {
      console.error('Event image deletion failed');
      res.status(500).json({ error: 'Event image deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting event image:', error);
    res.status(500).json({ error: 'Event image deletion failed', details: error.message });
  }
}

module.exports = {
  handleImageDelete,
};
