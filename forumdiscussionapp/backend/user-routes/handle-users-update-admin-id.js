const { query } = require('../db');
                                    
async function handleUsersUpdateAdminId(req, res) {
    {
        const { id } = req.params;
        const { name, email, roleId, courseId } = req.body;
      
        try {
          if (!name || !email || !roleId || !courseId) {
            console.log('Name, email, roleId, and courseId are required');
            return res.status(400).json({ error: 'Name, email, roleId, and courseId are required' });
          }
      
          // SQL query to update the user
          const sql = 'UPDATE users SET UserName = ?, UserEmail = ?, RoleID = ?, CourseID = ? WHERE UserID = ?';
          const [result] = await query(sql, [name, email, roleId, courseId, id]);
      
          if (result.affectedRows === 1) {
            console.log('User updated successfully');
            res.json({ message: 'User updated successfully' });
          } else {
            console.error('User update failed');
            res.status(500).json({ error: 'User update failed' });
          }
        } catch (error) {
          console.error('Error updating user:', error);
          res.status(500).json({ error: 'User update failed', details: error.message });
        }
    }  
};

module.exports = {
  handleUsersUpdateAdminId,
};