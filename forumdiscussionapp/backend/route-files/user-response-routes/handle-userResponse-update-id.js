const { query } = require('../../db');

async function handleUserResponseUpdateById(req, res) {
  const { userResponseId } = req.params;
  const { userId, questionId, answerId } = req.body;

  try {
    const sql = 'UPDATE UserResponses SET UserID = ?, QuestionID = ?, AnswerID = ? WHERE UserResponseID = ?';
    const [result] = await query(sql, [userId, questionId, answerId, userResponseId]);

    if (result.affectedRows === 1) {
      console.log('User response updated successfully');
      res.json({ message: 'User response updated successfully' });
    } else {
      console.error('User response update failed');
      res.status(500).json({ error: 'User response update failed' });
    }
  } catch (error) {
    console.error('Error updating user response:', error);
    res.status(500).json({ error: 'User response update failed', details: error.message });
  }
}

module.exports = {
  handleUserResponseUpdateById,
};
