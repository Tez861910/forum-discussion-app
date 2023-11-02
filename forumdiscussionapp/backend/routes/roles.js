const express = require('express');
const router = express.Router();
const { query } = require('../db');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Create a new role
router.post('/roles/create', async (req, res) => {
  const { roleName } = req.body;

  try {
    if (!roleName) {
      console.log('Role name is required');
      return res.status(400).json({ error: 'Role name is required' });
    }

    const sql = 'INSERT INTO roles (RoleName) VALUES (?)';
    const result = await query(sql, [roleName]);

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
});

// Get all roles
router.get('/roles/get', async (req, res) => {
  try {
    const sql = 'SELECT * FROM roles';
    const results = await query(sql);

    if (!Array.isArray(results)) {
      console.error('No roles found in the database');
      return res.status(404).json({ error: 'No roles found' });
    }

    const rolesData = results.map(row => ({
      roleId: row.RoleID,
      roleName: row.RoleName,
    }));

    console.log('Roles fetched successfully');
    res.status(200).json({ roles: rolesData });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Role retrieval failed', details: error.message });
  }
});

// Get a role by ID
router.get('/roles/get/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sql = 'SELECT * FROM roles WHERE RoleID = ?';
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
});

// Update a role
router.put('/roles/update/:id', async (req, res) => {
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
});

// Delete a role
router.delete('/roles/delete/:id', async (req, res) => {
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
});

module.exports = router;
