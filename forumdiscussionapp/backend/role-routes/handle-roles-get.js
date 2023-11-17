const { query } = require('../db');

async function handleRolesGet(req, res) {
  try {
    const sql = 'SELECT * FROM roles WHERE IsDeleted = false';
    const results = await query(sql);

    if (!Array.isArray(results)) {
      console.error('No roles found in the database');
      return res.status(404).json({ error: 'No roles found' });
    }

    const rolesData = results.map(row => ({
      roleId: row.RoleID,
      roleName: row.RoleName,
      isDeleted: row.IsDeleted,
    }));

    console.log('Roles fetched successfully');
    res.status(200).json({ roles: rolesData });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Role retrieval failed', details: error.message });
  }
}

module.exports = {
  handleRolesGet,
};
