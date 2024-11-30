import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userImage from '../imgs/iconuser.png'; 
import api from '../../../api/api'; 

const App = () => {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]); 
  const [filtroPokemons, setFiltroPokemons] = useState([]); 
  const [procQuery, setProcQuery] = useState(''); 
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await api.get('/pokemons');
        setPokemons(response.data);
        setFiltroPokemons(response.data);
      } catch (error) {
        console.error('Erro ao buscar pokemons do backend:', error);
      }
    }
    fetchPokemons();
  }, []);

  useEffect(() => {
    const results = pokemons.filter(pokemon =>
      pokemon.nome.toLowerCase().includes(procQuery.toLowerCase())
    );
    setFiltroPokemons(results);
  }, [procQuery, pokemons]);

  const procChange = (event) => {
    setProcQuery(event.target.value);
  };

  const sobre = () => {
    navigate('/sobre');
  };

  const pokedexClick = () => {
    navigate('/pokedex');
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

  const alterarDados = () => {
    navigate('/alterarDados');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
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
    return typeColors[type] || '#A8A878';
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">PokeWorld</h1>
        <nav>
          <button type="button" className="cadastrar" onClick={sobre}>
            Sobre
          </button>
          <button type="button" className="cadastrar" onClick={pokedexClick}>
            Pokedex
          </button>
          <button type="button" className="cadastrar" onClick={itensClick}>
            Itens
          </button>
          <button type="button" className="cadastrar" onClick={sobreNosClick}>
            Sobre Nós
          </button>
          <button type="button" className="cadastrar" onClick={adminpage}>
            Admin Page
          </button>
          <div className="user-profile" onClick={toggleDropdown}>
            <img src={userImage} alt="Usuário" className="user-image" />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <button onClick={alterarDados}>Alterar Dados</button>
                <button onClick={logout}>Desconectar</button>
              </div>
            )}
          </div>
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
          {filtroPokemons.length > 0 ? (
            filtroPokemons.map((pokemon) => (
              <div
                key={pokemon.id}
                className="pokemon"
                style={{ backgroundColor: typeColor(pokemon.tipo) }}
              >
                <img src={pokemon.imagem} alt={pokemon.nome} />
                <p><strong>{pokemon.nome}</strong></p>
                <p><strong>Tipo: {pokemon.tipo.toUpperCase()}</strong></p>
              </div>
            ))
          ) : (
            <div>Nenhum Pokémon encontrado.</div>
          )}
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
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .title {
            font-size: 36px;
            margin-left: 20px;
          }
          
          .header nav {
            display: flex;
            align-items: center;
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
          
          .user-profile {
            position: relative;
            cursor: pointer;
          }

          .user-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }

          .dropdown-menu {
            position: absolute;
            top: 50px;
            right: 0;
            background-color: #ffcc01;
            border: 1px solid #ddd;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }

          .dropdown-menu button {
            padding: 10px;
            font-size: 16px;
            background: none;
            border: none;
            text-align: left;
            cursor: pointer;
            width: 100%;
          }

          .dropdown-menu button:hover {
            background-color: #f5f5f5;
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
            transition: all 0.2s ease-in-out;
          }

          .pokemon:hover {
            transform: scale(1.05);
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



      