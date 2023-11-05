async function handleThreadsDeleteId(req, res) {
{
    const { id } = req.params;
    try {
      const sql = 'DELETE FROM Threads WHERE ThreadID = ?';
      const [result] = await query(sql, [id]);
      if (result.affectedRows === 1) {
        console.log('Thread deleted successfully');
        res.json({ message: 'Thread deleted successfully' });
      } else {
        console.error('Thread deletion failed');
        res.status(500).json({ error: 'Thread deletion failed' });
      }
    } catch (error) {
      console.error('Error deleting thread:', error);
      res.status(500).json({ error: 'Thread deletion failed', details: error.message });
    }
  }
};