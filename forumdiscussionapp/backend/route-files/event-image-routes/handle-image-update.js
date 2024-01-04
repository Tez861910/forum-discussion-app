const { query } = require('../../db');

async function handleImageUpdate(req, res) {
  const { imageId } = req.params;
  const { eventId, imageUrl } = req.body;

  try {
    const sql = 'UPDATE EventImages SET EventID = ?, ImageURL = ? WHERE ImageID = ?';
    const [result] = await query(sql, [eventId, imageUrl, imageId]);

    if (result.affectedRows === 1) {
      console.log('Event image updated successfully');
      res.json({ message: 'Event image updated successfully' });
    } else {
      console.error('Event image update failed');
      res.status(500).json({ error: 'Event image update failed' });
    }
  } catch (error) {
    console.error('Error updating event image:', error);
    res.status(500).json({ error: 'Event image update failed', details: error.message });
  }
}

module.exports = {
  handleImageUpdate,
};
