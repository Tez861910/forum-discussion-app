const { query } = require('../../db');
                                    
async function handleThreadsUpdateId(req, res) {
{
    const { threadId } = req.params;
    const { title, content, courseId } = req.body;
    try {
      if (!title || !content || !courseId ) {
        console.log('Title, content, courseId, and userId are required');
        return res.status(400).json({ error: 'Title, content, courseId, and userId are required' });
      }
      const sql = 'UPDATE Threads SET ThreadTitle = ?, ThreadContent = ?, CourseID = ?   WHERE ThreadID = ?';
      const [result] = await query(sql, [title, content, courseId, threadId]);
      if (result.affectedRows === 1) {
        console.log('Thread updated successfully');
        res.json({ message: 'Thread updated successfully' });
      } else {
        console.error('Thread update failed');
        res.status(500).json({ error: 'Thread update failed' });
      }
    } catch (error) {
      console.error('Error updating thread:', error);
      res.status(500).json({ error: 'Thread update failed', details: error.message });
    }
  }  
};

module.exports = {
  handleThreadsUpdateId,
};
  