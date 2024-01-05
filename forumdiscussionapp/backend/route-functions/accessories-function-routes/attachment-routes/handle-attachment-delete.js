const { query } = require('../../../db');

async function handleAttachmentDelete(req, res) {
  const { attachmentId } = req.params;

  try {
    const sql = 'DELETE FROM Attachments WHERE AttachmentID = ?';
    const [result] = await query(sql, [attachmentId]);

    if (result.affectedRows === 1) {
      console.log('Attachment deleted successfully');
      res.json({ message: 'Attachment deleted successfully' });
    } else {
      console.error('Attachment deletion failed');
      res.status(500).json({ error: 'Attachment deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting attachment:', error);
    res.status(500).json({ error: 'Attachment deletion failed', details: error.message });
  }
}

module.exports = {
  handleAttachmentDelete,
};
