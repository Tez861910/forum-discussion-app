async function handleThreadsCreate(req, res) {
{
    const { title, content, courseId, userId } = req.body;
    try {
      if (!title || !content || !courseId || !userId) {
        console.log('Title, content, courseId, and userId are required');
        return res.status(400).json({ error: 'Title, content, courseId, and userId are required' });
      }
      const sql = 'INSERT INTO Threads (ThreadTitle, ThreadContent, CourseID, UserID) VALUES (?, ?, ?, ?)';
      const [result] = await query(sql, [title, content, courseId, userId]);
      if (result.affectedRows === 1) {
        console.log('Thread created successfully');
        res.json({ message: 'Thread created successfully' });
      } else {
        console.error('Thread creation failed');
        res.status(500).json({ error: 'Thread creation failed' });
      }
    } catch (error) {
      console.error('Error creating thread:', error);
      res.status(500).json({ error: 'Thread creation failed', details: error.message });
    }
  }  
};
  