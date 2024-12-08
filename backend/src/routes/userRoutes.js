const express = require('express');
const userApi = require('../api/userApi');
const authMiddleware = require('../middleware/authMiddleware');
const pokemonApi = require('../api/pokemon');

const router = express.Router();

// Rotas de autenticação e usuários
router.post('/login', userApi.login);
router.post('/register', userApi.createUser);

router.get('/', authMiddleware(['Admin']), userApi.findUsers);
router.post('/', authMiddleware(['Admin']), userApi.createUser);
router.put('/:id', authMiddleware(['Admin']), userApi.updateUser);
router.delete('/:id', authMiddleware(['Admin']), userApi.deleteUser);
router.put('/me', authMiddleware, userApi.updateUserLogado);

// Rotas de Pokémons
router.get('/pokemons', pokemonApi.listarPokemons);
router.get('/itens', pokemonApi.listarItens);

// CRUD de Pokémons
router.post('/pokemons', authMiddleware(['Admin']), pokemonApi.criarPokemon); // Criar um novo Pokémon
router.put('/pokemons/:id', authMiddleware(['Admin']), pokemonApi.atualizarPokemon); // Atualizar Pokémon por ID
router.delete('/pokemons/:id', authMiddleware(['Admin']), pokemonApi.deletarPokemon); // Deletar Pokémon por ID

module.exports = router;
