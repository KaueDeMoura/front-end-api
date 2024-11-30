const Pokemon = require('../models/pokemon');

class PokemonController {
  
  async listarPokemons() {

    const pokemons = await Pokemon.findAll({
      order: [['id', 'ASC']],
      limit: 300
    });
  
    if (pokemons.length === 0) {
      let hasMore = true;
      let currentPage = 1;
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
          const pokemonDetails = await fetch(poke.url).then(res => res.json());
  
          await Pokemon.create({
            nome: pokemonDetails.name,
            tipo: pokemonDetails.types.map(t => t.type.name).join(', '),
            imagem: pokemonDetails.sprites.front_default,
          });
          totalFetched++;
          if (totalFetched >= 300) break; 
        }
  
        currentPage++;
      }
    }
  
    return pokemons;
  }
}

module.exports = new PokemonController();
