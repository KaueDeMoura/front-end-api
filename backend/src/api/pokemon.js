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
}

module.exports = new PokemonApi();
