const express = require('express');
const userApi = require('../api/userApi');
const authMiddleware = require('../middleware/authMiddleware');
const pokemonApi = require('../api/pokemon');

const router = express.Router();

router.post('/login', userApi.login);
router.post('/register', userApi.createUser);

router.get('/', authMiddleware(['Admin']), userApi.findUsers);
router.post('/', authMiddleware(['Admin']), userApi.createUser);
router.put('/:id', authMiddleware(['Admin']), userApi.updateUser);
router.delete('/:id', authMiddleware(['Admin']), userApi.deleteUser);
router.put('/me', authMiddleware, userApi.updateUserLogado);

router.get('/pokemons', pokemonApi.listarPokemons);
router.get('/itens', pokemonApi.listarItens);

router.post('/pokemons', authMiddleware(['Admin']), pokemonApi.criarPokemon); 
router.put('/pokemons/:id', authMiddleware(['Admin']), pokemonApi.atualizarPokemon);
router.delete('/pokemons/:id', authMiddleware(['Admin']), pokemonApi.deletarPokemon); 

module.exports = router;
