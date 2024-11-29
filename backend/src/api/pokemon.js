const controller = require('../controller/Pokemon');

class PokemonApi {
  async criarPokemon(req, res) {
    const { nome, tipo, imagem } = req.body;
  
    try {
      const novoPokemon = await controller.criarPokemon(nome, tipo, imagem);
      return res.status(201).send(novoPokemon);
    } catch (error) {
      return res.status(400).send({ error: `Erro ao criar Pokémon: ${error.message}` });
    }
  }
  

  async alterarPokemon(req, res) {
    const { id } = req.params;
    const { nome, tipo,  } = req.body;

    try {
      const pokemon = await controller.alterarPokemon(Number(id), nome, tipo, );
      return res.status(200).send(pokemon);
    } catch (error) {
      return res.status(400).send({ error: `Erro ao alterar Pokémon: ${error.message}` });
    }
  }

  async deletarPokemon(req, res) {
    const { id } = req.params;

    try {
      await controller.deletarPokemon(Number(id));
      return res.status(204).send();
    } catch (error) {
      return res.status(400).send({ error: `Erro ao deletar Pokémon: ${error.message}` });
    }
  }

  async buscarPokemonPorId(req, res) {
    const { id } = req.params;

    try {
      const pokemon = await controller.buscarPorId(Number(id));
      return res.status(200).send(pokemon);
    } catch (error) {
      return res.status(404).send({ error: `Pokémon não encontrado: ${error.message}` });
    }
  }

  async listarPokemons(req, res) {
    const { page = 1 } = req.query;

    try {
      const pokemons = await controller.listarPokemons(page);
      return res.status(200).send(pokemons);
    } catch (error) {
      return res.status(400).send({ error: `Erro ao listar Pokémons: ${error.message}` });
    }
  }
}

module.exports = new PokemonApi();
