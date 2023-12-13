const express = require('express');
const router = express.Router();
const { getAllRoles, getRole, createRole, updateRole, deleteRole } = require('../controllers/RoleController');
const { authorizeAcceess } = require('../middlewares/AuthorizeUser');

// GET /api/roles
router.get('/', authorizeAcceess, getAllRoles);

// GET /api/roles/:roleId
router.get('/:roleId', authorizeAcceess, getRole);

// POST /api/roles
router.post('/', createRole);

// PUT /api/roles/:roleId
router.put('/:roleId', authorizeAcceess, updateRole);

// DELETE /api/roles/:roleId
router.delete('/:roleId', authorizeAcceess, deleteRole);

module.exports = router;
