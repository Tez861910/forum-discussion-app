const { query } = require('../../db');

async function handleAttachmentTypeGetAll(req, res) {
  try {
    const sql = 'SELECT * FROM AttachmentType';
    const [result] = await query(sql);

    console.log('Attachment types retrieved successfully');
    res.json(result);
  } catch (error) {
    console.error('Error getting attachment types:', error);
    res.status(500).json({ error: 'Error getting attachment types', details: error.message });
  }
}

module.exports = {
  handleAttachmentTypeGetAll,
};
