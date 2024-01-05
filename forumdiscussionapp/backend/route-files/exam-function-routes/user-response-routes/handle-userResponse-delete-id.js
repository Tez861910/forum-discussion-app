const { query } = require('../../../db');

async function handleUserResponseDeleteById(req, res) {
  const { userResponseId } = req.params;

  try {
    const sql = 'DELETE FROM UserResponses WHERE UserResponseID = ?';
    const [result] = await query(sql, [userResponseId]);

    if (result.affectedRows === 1) {
      console.log('User response deleted successfully');
      res.json({ message: 'User response deleted successfully' });
    } else {
      console.error('User response deletion failed');
      res.status(500).json({ error: 'User response deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting user response:', error);
    res.status(500).json({ error: 'Error deleting user response', details: error.message });
  }
}

module.exports = {
  handleUserResponseDeleteById,
};
