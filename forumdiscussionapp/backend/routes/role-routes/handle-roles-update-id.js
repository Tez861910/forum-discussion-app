async function handleRolesUpdateId(req, res) {
    {
        const { id } = req.params;
        const { roleName } = req.body;
      
        try {
          if (!roleName) {
            console.log('Role name is required');
            return res.status(400).json({ error: 'Role name is required' });
          }
      
          const sql = 'UPDATE roles SET RoleName = ? WHERE RoleID = ?';
          const result = await query(sql, [roleName, id]);
      
          if (result.affectedRows === 1) {
            console.log('Role updated successfully');
            res.json({ message: 'Role updated successfully' });
          } else {
            console.error('Role update failed');
            res.status(500).json({ error: 'Role update failed' });
          }
        } catch (error) {
          console.error('Error updating role:', error);
          res.status(500).json({ error: 'Role update failed', details: error.message });
        }
      }
    };