const controller = require('../controllers/Pokemon');

class PokemonApi {

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
