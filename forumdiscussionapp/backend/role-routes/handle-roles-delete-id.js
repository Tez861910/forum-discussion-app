const { query } = require('../db');

async function handleRolesDeleteId(req, res) {
  {
  
  const { id } = req.params;

  try {
    const sql = 'DELETE FROM roles WHERE RoleID = ?';
    const [result] = await query(sql, [id]);

    if (result.affectedRows === 1) {
      console.log('Role deleted successfully');
      return res.status(204).send(); 
    } else {
      console.error('Role deletion failed');
      return res.status(404).json({ error: 'Role not found' }); 
    }
  } catch (error) {
    console.error('Error deleting role:', error);
    return res.status(500).json({ error: 'Role deletion failed', details: error.message });
   }
  }
};
module.exports = {
  handleRolesDeleteId,
};
