import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5000');
        if (!response.ok) {
          throw new Error('HTTP error! Status: ' + response.status);
        }
        const data = await response.json();

       
        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            return {
              name: pokemon.name.toUpperCase(),
              image: pokemonData.sprites.front_default,
            };
          })
        );

        setPokemons(detailedPokemons);
        setFilteredPokemons(detailedPokemons);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      }
    }
    fetchPokemons();
  }, []);

  useEffect(() => {
    const results = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemons(results);
  }, [searchQuery, pokemons]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sobreClick = () => {
    navigate('/sobre');
  };
  
  const itensClick = () => {
    navigate('/itens');
  };
  
  const sobreNosClick = () => {
    navigate('/sobreNos');
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">PokeWorld Pokedex</h1>
        <nav>
          <button type="button" className='cadastrar' onClick={sobreClick}>
            Sobre
          </button>
          <button type="button" className='cadastrar' onClick={itensClick}>
            Itens
          </button>
          <button type="button" className='cadastrar' onClick={sobreNosClick}>
            Sobre Nos
          </button>
        </nav>
      </header>
      <main className="main-content">
        <section className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar Pokémon..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </section>
        <section className="pokemon-list">
          {filteredPokemons.map((pokemon) => (
            <div key={pokemon.name} className="pokemon">
              <img src={pokemon.image} alt={pokemon.name} />
              <p><strong>{pokemon.name}</strong></p>
            </div>
          ))}
        </section>
      </main>
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: white;
            height: 100%;
            overflow-y: auto; /* Permite a rolagem da página */
            background-image: none;
          }
          
          .app {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
          }
          
          .header {
            width: 100%;
            background-color: #ffcc01;
            padding: 10px 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          
          .title {
            font-size: 36px;
            color: #333;
            margin: 0;
          }
          
          header nav {
            display: flex;
            justify-content: center;
            gap: 15px;
          }
          
          .cadastrar {
            padding: 10px 20px;
            border-radius: 15px;
            background-color: #007bff;
            color: white;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }
          
          header button:hover {
            background-color: #0056b3;
          }
          
          .main-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px;
            width: 100%;
          }
          
          .search-bar {
            margin-bottom: 20px;
          }
          
          .search-bar input {
            padding: 10px;
            font-size: 16px;
            border-radius: 4px;
            border: 1px solid #ddd;
          }
          
          .pokemon-list {
            display: grid;
            grid-template-columns: repeat(5, 1fr); /* Ajustado para 5 itens por linha */
            gap: 20px;
          }
          
          .pokemon {
            background-color: #f9f9f9;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            text-align: center;
          }
          
          .pokemon img {
            max-width: 100px;
            max-height: 100px;
            margin-bottom: 10px;
          }
          
          .pokemon p {
            margin: 0;
            font-size: 14px;
          }
        `}
      </style>
    </div>
  );
};

export default App;
