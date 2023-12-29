const { query } = require('../db');

async function handleRolesGetId(req, res) {
  const { id } = req.params;

  try {
    const sql = 'SELECT r.*, ca.IsDeleted as CommonAttributeIsDeleted FROM Roles r INNER JOIN CommonAttributes ca ON r.CommonAttributeID = ca.AttributeID WHERE r.RoleID = ? AND ca.IsDeleted = false';
    const result = await query(sql, [id]);

    if (result.length === 1) {
      console.log('Role fetched successfully');
      res.json({ role: result[0] });
    } else {
      console.error('Role not found');
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ error: 'Role retrieval failed', details: error.message });
  }
}

module.exports = {
  handleRolesGetId,
};
