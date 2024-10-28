const express = require('express');
const userApi = require('../api/userApi');
console.log(userApi);
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', userApi.login);
router.post('/register', userApi.createUser);

router.get('/', authMiddleware(['Admin']), userApi.findUsers);
router.post('/', authMiddleware(['Admin']), userApi.createUser);
router.put('/:id', authMiddleware(['Admin']), userApi.updateUser);
router.delete('/:id', authMiddleware(['Admin']), userApi.deleteUser);

module.exports = router;
