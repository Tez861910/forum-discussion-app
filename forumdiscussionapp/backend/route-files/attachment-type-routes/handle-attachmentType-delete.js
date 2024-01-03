const { query } = require('../../db');

async function handleAttachmentTypeDelete(req, res) {
  const { attachmentTypeId } = req.params;

  try {
    const sql = 'DELETE FROM AttachmentType WHERE AttachmentTypeID = ?';
    const [result] = await query(sql, [attachmentTypeId]);

    if (result.affectedRows === 1) {
      console.log('Attachment type deleted successfully');
      res.json({ message: 'Attachment type deleted successfully' });
    } else {
      console.error('Attachment type deletion failed');
      res.status(500).json({ error: 'Attachment type deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting attachment type:', error);
    res.status(500).json({ error: 'Error deleting attachment type', details: error.message });
  }
}

module.exports = {
  handleAttachmentTypeDelete,
};
