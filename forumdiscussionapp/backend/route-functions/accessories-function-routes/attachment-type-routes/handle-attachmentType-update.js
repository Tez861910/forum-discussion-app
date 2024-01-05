const { query } = require('../../../db');

async function handleAttachmentTypeUpdate(req, res) {
  const { attachmentTypeId } = req.params;
  const { attachmentTypeName } = req.body;

  try {
    if (!attachmentTypeName) {
      console.log('AttachmentTypeName is required');
      return res.status(400).json({
        error: 'AttachmentTypeName is required',
      });
    }

    const sql = 'UPDATE AttachmentType SET AttachmentTypeName = ? WHERE AttachmentTypeID = ?';
    const [result] = await query(sql, [attachmentTypeName, attachmentTypeId]);

    if (result.affectedRows === 1) {
      console.log('Attachment type updated successfully');
      res.json({ message: 'Attachment type updated successfully' });
    } else {
      console.error('Attachment type update failed');
      res.status(500).json({ error: 'Attachment type update failed' });
    }
  } catch (error) {
    console.error('Error updating attachment type:', error);
    res.status(500).json({ error: 'Attachment type update failed', details: error.message });
  }
}

module.exports = {
  handleAttachmentTypeUpdate,
};
