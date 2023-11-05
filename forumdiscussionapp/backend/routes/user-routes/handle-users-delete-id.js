async function handleUsersDeleteId(req, res) {
    {
        const { id } = req.params;
      
        try {
          // SQL query to delete the user
          const sql = 'DELETE FROM users WHERE UserID = ?';
          const [result] = await query(sql, [id]);
      
          if (result.affectedRows === 1) {
            console.log('User deleted successfully');
            res.json({ message: 'User deleted successfully' });
          } else {
            console.error('User deletion failed');
            res.status(500).json({ error: 'User deletion failed' });
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          res.status(500).json({ error: 'User deletion failed', details: error.message });
        }
    }
};