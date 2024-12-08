const PokemonController = require('../controllers/Pokemon');

class PokemonApi {
  async listarPokemons(req, res) {
    const { page = 1 } = req.query;

    try {
      const pokemons = await PokemonController.listarPokemons(page);
      return res.status(200).send(pokemons);
    } catch (error) {
      return res.status(400).send({ error: `Erro ao listar Pokémons: ${error.message}` });
    }
  }

  async listarItens(req, res) {
    try {
      const itens = await PokemonController.listarItens();
      return res.status(200).send(itens);
    } catch (error) {
      return res.status(400).send({ error: `Erro ao listar itens: ${error.message}` });
    }
  }

  async criarPokemon(req, res) {
    try {
      const novoPokemon = await PokemonController.criarPokemon(req.body);
      return res.status(201).send(novoPokemon);
    } catch (error) {
      return res.status(400).send({ error: `Erro ao criar Pokémon: ${error.message}` });
    }
  }

  async atualizarPokemon(req, res) {
    const { id } = req.params;

    try {
      const pokemonAtualizado = await PokemonController.atualizarPokemon(id, req.body);
      return res.status(200).send(pokemonAtualizado);
    } catch (error) {
      return res.status(400).send({ error: `Erro ao atualizar Pokémon: ${error.message}` });
    }
  }

  async deletarPokemon(req, res) {
    const { id } = req.params;

    try {
      await PokemonController.deletarPokemon(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).send({ error: `Erro ao deletar Pokémon: ${error.message}` });
    }
  }
}

module.exports = new PokemonApi();
