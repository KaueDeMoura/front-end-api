const Pokemon = require('../model/pokemon');

class PokemonController {
  async criarPokemon(nome, tipo, imagem) {
    if (!nome || !tipo ) {
      throw new Error('Todos os campos (nome, tipo, são obrigatórios');
    }
  
    const novoPokemon = await Pokemon.create({ nome, tipo, habilidade, peso, imagem });
    return novoPokemon;
  }
  async buscarPorId(id) {

    if (!id) {
      throw new Error('ID é obrigatório');
    }
  
    
    let pokemon = await Pokemon.findByPk(id);
   
  
    if (!pokemon) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      
      if (!response.ok) {
        throw new Error('Pokémon não encontrado');
      }
      
      const data = await response.json();
  
      pokemon = await Pokemon.create({
        nome: data.name, 
        tipo: data.types.map(t => t.type.name).join(', '), 
        imagem: data.sprites.front_default,
      });
    }
  
 
    return pokemon;
  }
  
  async listarPokemons() {

    const pokemons = await Pokemon.findAll({
      order: [['id', 'ASC']],
      limit: 300
    });
  
    if (pokemons.length === 0) {
      let hasMore = true;
      let currentPage = 1;
      let totalFetched = 0;
  
      while (hasMore && totalFetched < 300) { // Limite de 300 Pokémon
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
          if (totalFetched >= 300) break; // Interrompe ao alcançar 300 Pokémon
        }
  
        currentPage++;
      }
    }
  
    return pokemons;
  }
  
  async alterarPokemon(id, nome, tipo) {
    if (!id || !nome || !tipo ) {
      throw new Error('ID, nome, tipo são obrigatórios');
    }

    const pokemon = await this.buscarPorId(id);
    pokemon.nome = nome;
    pokemon.tipo = tipo;
   
    await pokemon.save();

    return { message: 'Pokémon alterado com sucesso' };
  }

  async deletarPokemon(id) {
    if (!id) {
      throw new Error('ID é obrigatório');
    }

    const pokemon = await this.buscarPorId(id);
    await pokemon.destroy();

    return { message: 'Pokémon deletado com sucesso' };
  }
}

module.exports = new PokemonController();
