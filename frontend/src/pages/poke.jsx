import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const [pokemons, setPokemons] = useState([]);
  const [filtroPokemons, setFiltroPokemons] = useState([]);
  const [procQuery, setProcQuery] = useState('');

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        if (!response.ok) {
          throw new Error('HTTP erro: ' + response.status);
        }
        const data = await response.json();

        const detalheSPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            const type = pokemonData.types[0]?.type.name;
            return {
              name: pokemon.name.toUpperCase(),
              image: pokemonData.sprites.front_default,
              type: type,
            };
          })
        );

        setPokemons(detalheSPokemons);
        setFiltroPokemons(detalheSPokemons);
      } catch (error) {
        console.error('Erro ao encontrar pokemons:', error);
      }
    }
    fetchPokemons();
  }, []);

  useEffect(() => {
    const results = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(procQuery.toLowerCase())
    );
    setFiltroPokemons(results);
  }, [procQuery, pokemons]);

  const procChange = (event) => {
    setProcQuery(event.target.value);
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
  const adminpage = () => {
    navigate('/admin/crud');
  };

  const logout = () => {
    localStorage.clear('token');
    navigate('/login');
  };

  const typeColor = (type) => {
    const typeColors = {
      grass: '#78C850',
      fire: '#F08030',
      water: '#6890F0',
      bug: '#A8B820',
      normal: '#A8A878',
      poison: '#A040A0',
      electric: '#F8D030',
      ground: '#E0C068',
      fairy: '#EE99AC',
      fighting: '#C03028',
      psychic: '#F85888',
      rock: '#B8A038',
      ghost: '#705898',
      ice: '#98D8D8',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      flying: '#A890F0',
    };
    return typeColors[type];
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
          <button type="button" className='cadastrar' onClick={adminpage}>
            Admin Page
          </button>
          <button type="button" className='sair' onClick={logout}>
          Desconectar
          </button>
        </nav>
      </header>
      <main className="conteudo-main">
        <section className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar Pokémon..."
            value={procQuery}
            onChange={procChange}
          />
        </section>
        <section className="listpokemon">
          {filtroPokemons.map((pokemon) => (
            <div 
              key={pokemon.name} 
              className="pokemon"
              style={{ backgroundColor: typeColor(pokemon.type) }}
            >
              <img src={pokemon.image} alt={pokemon.name} />
              <p><strong>{pokemon.name}</strong></p>
              <p><strong>Tipo: {pokemon.type.toUpperCase()}</strong></p>
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
            overflow-y: auto;
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
          
          .conteudo-main {
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
          
          .listpokemon {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
          }
          
          .pokemon {
            background-color: #f9f9f9;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            text-align: center;
            animation: moveCard 5s infinite;
            transition: all 0.2s ease-in-out;
          }

          .pokemon:hover {
            animation: jump 0.3s ease-in-out;
        }

        @keyframes jump {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
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
