const { query } = require('../db');

async function handleRolesDeleteId(req, res) {
    {
        const { id } = req.params;
      
        try {
          const sql = 'DELETE FROM roles WHERE RoleID = ?';
          const result = await query(sql, [id]);
      
          if (result.affectedRows === 1) {
            console.log('Role deleted successfully');
            res.json({ message: 'Role deleted successfully' });
          } else {
            console.error('Role deletion failed');
            res.status(500).json({ error: 'Role deletion failed' });
          }
        } catch (error) {
          console.error('Error deleting role:', error);
          res.status(500).json({ error: 'Role deletion failed', details: error.message });
        }
      }   
    };

    module.exports = {
      handleRolesDeleteId,
    };