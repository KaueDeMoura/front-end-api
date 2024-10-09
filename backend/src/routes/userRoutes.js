const express = require('express');
const { getUsers, createUser, deleteUser, registerUser, loginUser, updateUser } = require('../controllers/userController');
const { autenticacao, contaAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

router.get('/', autenticacao, contaAdmin, getUsers);
router.post('/', autenticacao, contaAdmin, createUser);
router.put('/:id', autenticacao, contaAdmin, updateUser);
router.delete('/:id', autenticacao, contaAdmin, deleteUser);

module.exports = router;
