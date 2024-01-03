const { query } = require('../../db');

async function handleAttachmentTypeCreate(req, res) {
  const { attachmentTypeName } = req.body;

  try {
    if (!attachmentTypeName) {
      console.log('AttachmentTypeName is required');
      return res.status(400).json({
        error: 'AttachmentTypeName is required',
      });
    }

    const sql = 'INSERT INTO AttachmentType (AttachmentTypeName) VALUES (?)';
    const [result] = await query(sql, [attachmentTypeName]);

    if (result.affectedRows === 1) {
      console.log('Attachment type created successfully');
      res.json({ message: 'Attachment type created successfully' });
    } else {
      console.error('Attachment type creation failed');
      res.status(500).json({ error: 'Attachment type creation failed' });
    }
  } catch (error) {
    console.error('Error creating attachment type:', error);
    res.status(500).json({ error: 'Attachment type creation failed', details: error.message });
  }
}

module.exports = {
  handleAttachmentTypeCreate,
};