const { query } = require('../../db');

async function handleAttachmentUpdate(req, res) {
  const { attachmentId } = req.params;
  const { filePath, attachedByUserId, attachmentTypeId, attachedToType, attachedToId, description } = req.body;

  try {
    if (!filePath || !attachedByUserId || !attachmentTypeId || !attachedToType || !attachedToId) {
      console.log('FilePath, AttachedByUserId, AttachmentTypeId, AttachedToType, and AttachedToId are required');
      return res.status(400).json({
        error: 'FilePath, AttachedByUserId, AttachmentTypeId, AttachedToType, and AttachedToId are required',
      });
    }

    const sql =
      'UPDATE Attachments SET FilePath = ?, AttachedByUserID = ?, AttachmentTypeID = ?, AttachedToType = ?, AttachedToID = ?, Description = ? WHERE AttachmentID = ?';
    const [result] = await query(sql, [filePath, attachedByUserId, attachmentTypeId, attachedToType, attachedToId, description, attachmentId]);

    if (result.affectedRows === 1) {
      console.log('Attachment updated successfully');
      res.json({ message: 'Attachment updated successfully' });
    } else {
      console.error('Attachment update failed');
      res.status(500).json({ error: 'Attachment update failed' });
    }
  } catch (error) {
    console.error('Error updating attachment:', error);
    res.status(500).json({ error: 'Attachment update failed', details: error.message });
  }
}

module.exports = {
  handleAttachmentUpdate,
};
