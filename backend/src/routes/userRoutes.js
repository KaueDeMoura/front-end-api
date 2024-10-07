const express = require('express');
const { getUsers, createUser, deleteUser, registerUser, loginUser, updateUser } = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

router.get('/', authenticate, isAdmin, getUsers);
router.post('/', authenticate, isAdmin, createUser);
router.put('/:id', authenticate, isAdmin, updateUser);
router.delete('/:id', authenticate, isAdmin, deleteUser);

module.exports = router;
