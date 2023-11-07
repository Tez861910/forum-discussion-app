const { query } = require('../db');

async function handleRolesCreate(req, res) {
  {
    const { roleName } = req.body;}
    
  try {
    if (!roleName) {
      console.log('Role name is required');
      return res.status(400).json({ error: 'Role name is required' });
    }

    const sql = 'INSERT INTO roles (RoleName) VALUES (?)';
    const [result] = await query(sql, [roleName]);

    if (result.affectedRows === 1) {
      console.log('Role created successfully');
      return res.json({ message: 'Role created successfully' });
    } else {
      console.error('Role creation failed');
      console.error('SQL Error:', result.message);
      return res.status(500).json({ error: 'Role creation failed', details: result.message });
    }
  } catch (error) {
    console.error('Error creating role:', error);
    return res.status(500).json({ error: 'Role creation failed', details: error.message });
  }
}

module.exports = {
  handleRolesCreate,
};
