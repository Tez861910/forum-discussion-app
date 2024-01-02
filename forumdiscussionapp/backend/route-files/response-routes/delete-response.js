const { query } = require('../../db');

// Delete a response
async function deleteResponse(req, res) {
    const { responseId } = req.params;
  
    try {
      await query('DELETE FROM responses WHERE ResponseID = ?', [responseId]);
  
      res.json({ message: 'Response deleted successfully' });
    } catch (error) {
      console.error('Error deleting response:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  module.exports={
    deleteResponse,
}