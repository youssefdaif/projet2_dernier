const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/UserController');
const { authorizeAcceess } = require('../middlewares/AuthorizeUser');

// GET /api/users
router.get('/', authorizeAcceess, getAllUsers);

// GET /api/users/:userId
router.get('/:user_id', authorizeAcceess, getUser);

// POST /api/users
router.post('/', authorizeAcceess, createUser);

// PUT /api/users/:userId
router.put('/:user_id', authorizeAcceess, updateUser);

// DELETE /api/users/:userId
router.delete('/:user_id', authorizeAcceess, deleteUser);

module.exports = router;
