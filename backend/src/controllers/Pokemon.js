const Pokemon = require('../models/pokemon');
const fetch = require('node-fetch');

class PokemonController {
  async listarPokemons() {
    const pokemons = await Pokemon.findAll({
      order: [['id', 'ASC']],
      limit: 300,
    });

    if (pokemons.length === 0) {
      let hasMore = true;
      let totalFetched = 0;

      while (hasMore && totalFetched < 300) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
        if (!response.ok) {
          throw new Error('Erro ao buscar Pokémons da API');
        }

        const data = await response.json();
        if (!data.next || totalFetched >= 300) {
          hasMore = false;
        }

        for (const poke of data.results) {
          const pokemonDetails = await fetch(poke.url).then((res) => res.json());

          await Pokemon.create({
            nome: pokemonDetails.name,
            tipo: pokemonDetails.types.map((t) => t.type.name).join(', '),
            imagem: pokemonDetails.sprites.front_default,
          });
          totalFetched++;
          if (totalFetched >= 300) break;
        }
      }
    }

    return pokemons;
  }

  async listarItens() {
    const response = await fetch('https://pokeapi.co/api/v2/item?limit=90');
    if (!response.ok) {
      throw new Error('Erro ao buscar itens da API');
    }

    const data = await response.json();

    const detailedItems = await Promise.all(
      data.results.map(async (item) => {
        const itemResponse = await fetch(item.url);
        if (!itemResponse.ok) {
          throw new Error('Erro ao buscar detalhes do item');
        }
        const itemData = await itemResponse.json();
        return {
          name: itemData.name.toUpperCase(),
          image: itemData.sprites.default,
        };
      })
    );

    return detailedItems;
  }

  async criarPokemon(data) {
    try {
      const novoPokemon = await Pokemon.create({
        nome: data.nome,
        tipo: data.tipo,
        imagem: data.imagem,
      });

      return novoPokemon;
    } catch (error) {
      throw new Error(`Erro ao criar Pokémon: ${error.message}`);
    }
  }

  async atualizarPokemon(id, data) {
    try {
      const pokemon = await Pokemon.findByPk(id);

      if (!pokemon) {
        throw new Error('Pokémon não encontrado');
      }

      const pokemonAtualizado = await pokemon.update({
        nome: data.nome || pokemon.nome,
        tipo: data.tipo || pokemon.tipo,
        imagem: data.imagem || pokemon.imagem,
      });

      return pokemonAtualizado;
    } catch (error) {
      throw new Error(`Erro ao atualizar Pokémon: ${error.message}`);
    }
  }

  async deletarPokemon(id) {
    try {
      const pokemon = await Pokemon.findByPk(id);

      if (!pokemon) {
        throw new Error('Pokémon não encontrado');
      }

      await pokemon.destroy();
    } catch (error) {
      throw new Error(`Erro ao deletar Pokémon: ${error.message}`);
    }
  }
}

module.exports = new PokemonController();
