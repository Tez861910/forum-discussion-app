const express = require('express');
const router = express.Router();
const cors = require('cors');
const Joi = require('joi');

const app = express();
app.use(express.json());
app.use(cors());


const { handleRolesGet } = require('../role-routes/handle-roles-get');
const { handleRolesCreate } = require('../role-routes/handle-roles-create');
const { handleRolesGetId } = require('../role-routes/handle-roles-get-id');
const { handleRolesUpdateId } = require('../role-routes/handle-roles-update-id');
const { handleRolesPatchId } = require('../role-routes/handle-roles-patch-id');
const { handleRolesEnrollmentsId } = require('../role-routes/handle-roles-enrollments-id');
const { handleRolesIdEnroll } = require('../role-routes/handle-roles-id-enroll');
const { handleRIDEnrollmentsUID } = require('../role-routes/handle-roles-rid-enrollments-uid');


// Validate request parameters and body
function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate({ ...req.body, ...req.params });
    if (error) {
      console.log('Invalid request:', error.details[0].message);
      return res.status(400).json({ error: 'Invalid request' });
    }
    next();
  };
}

// Create a new role
router.post('/roles/create', validate(Joi.object({
  roleName: Joi.string().min(1).required()
})), handleRolesCreate);

// Get all roles
router.get('/roles/get', handleRolesGet);

// Get a role by ID
router.get('/roles/get/:id', validate(Joi.object({
  id: Joi.number().integer().min(1).required()
})), handleRolesGetId);

// Update a role
router.put('/roles/update/:id', validate(Joi.object({
  id: Joi.number().integer().min(1).required(),
  roleName: Joi.string().min(1).required()
})), handleRolesUpdateId);

// Patch (soft delete) a role
router.patch('/roles/delete/:id', validate(Joi.object({
  id: Joi.number().integer().min(1).required()
})), handleRolesPatchId);

// Get role enrollments
router.get('/roles/enrollments/:roleId', validate(Joi.object({
  roleId: Joi.number().integer().min(1).required()
})), handleRolesEnrollmentsId);

// Enroll user in a role
router.post('/roles/:roleId/enroll', validate(Joi.object({
  roleId: Joi.number().integer().min(1).required(),
  userId: Joi.number().integer().min(1).required()
})), handleRolesIdEnroll);

// Patch (soft delete) removing user from a role
router.patch('/roles/:roleId/enrollments/:userId', validate(Joi.object({
  roleId: Joi.number().integer().min(1).required(),
  userId: Joi.number().integer().min(1).required()
})), handleRIDEnrollmentsUID);

module.exports = router;
