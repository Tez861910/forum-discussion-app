const { query } = require('../../db');

async function handleRolesCreate(req, res) {
  const { roleName, description, createdByUserID } = req.body;

  try {
    if (!roleName || !createdByUserID) {
      console.log('Role name and createdByUserID are required');
      return res.status(400).json({ error: 'Role name and createdByUserID are required' });
    }

    // Insert CommonAttributes
    const commonAttributesSql = 'INSERT INTO CommonAttributes (CreatedByUserID) VALUES (?)';
    const [commonAttributesResult] = await query(commonAttributesSql, [createdByUserID]);

    if (commonAttributesResult.affectedRows !== 1) {
      console.error('CommonAttributes creation failed');
      return res.status(500).json({ error: 'CommonAttributes creation failed' });
    }

    const commonAttributeID = commonAttributesResult.insertId;

    // Insert Role
    const roleSql = 'INSERT INTO Roles (RoleName, RoleDescription, CommonAttributeID) VALUES (?, ?, ?)';
    const [result] = await query(roleSql, [roleName, description, commonAttributeID]);

    if (result.affectedRows === 1) {
      console.log('Role created successfully');
      res.json({ message: 'Role created successfully' });
    } else {
      console.error('Role creation failed');
      res.status(500).json({ error: 'Role creation failed' });
    }
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ error: 'Role creation failed', details: error.message });
  }
}

module.exports = {
  handleRolesCreate,
};
