const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// Create a new role
router.post('/', (req, res) => {
  const { roleName } = req.body;

  const sql = 'INSERT INTO roles (RoleName) VALUES (?)';

  db.query(sql, [roleName], (err, result) => {
    if (err) {
      console.error('Error creating role:', err);
      return res.status(500).json({ error: 'Role creation failed' });
    }
    res.json({ message: 'Role created successfully', roleId: result.insertId });
  });
});

// Get a list of all roles
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM roles';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching roles:', err);
      return res.status(500).json({ error: 'Error fetching roles' });
    }
    res.json(results);
  });
});

// Update a role by ID
router.put('/:roleId', (req, res) => {
  const roleId = req.params.roleId;
  const { roleName } = req.body;
  const sql = 'UPDATE roles SET RoleName = ? WHERE RoleID = ?';

  db.query(sql, [roleName, roleId], (err, result) => {
    if (err) {
      console.error('Error updating role:', err);
      return res.status(500).json({ error: 'Role update failed' });
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Role not found' });
    } else {
      res.json({ message: 'Role updated successfully' });
    }
  });
});

// Delete a role by ID
router.delete('/:roleId', (req, res) => {
  const roleId = req.params.roleId;
  const sql = 'DELETE FROM roles WHERE RoleID = ?';

  db.query(sql, [roleId], (err, result) => {
    if (err) {
      console.error('Error deleting role:', err);
      return res.status(500).json({ error: 'Role deletion failed' });
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Role not found' });
    } else {
      res.json({ message: 'Role deleted successfully' });
    }
  });
});

module.exports = router;
