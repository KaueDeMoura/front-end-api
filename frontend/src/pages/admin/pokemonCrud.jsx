import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PokemonCrud() {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]); // Lista de Pokémons
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [imagem, setImagem] = useState('');
  const [editarId, setEditarId] = useState(null);

  const apiUrl = 'https://pokeworld-backend.onrender.com'; // Ajuste para sua URL de backend

  // Carregar Pokémons no início
  useEffect(() => {
    carregarPokemons();
  }, []);

  const carregarPokemons = async () => {
    try {
      const response = await axios.get(`https://pokeworld-backend.onrender.com/pokemons`);
      setPokemons(response.data);
    } catch (error) {
      console.error('Erro ao carregar Pokémons:', error);
    }
  };

  // Adicionar novo Pokémon
  const adicionarPokemon = async () => {
    try {
      await axios.post(`https://pokeworld-backend.onrender.com/pokemons`, {
        nome,
        tipo,
        imagem,
      });
      carregarPokemons();
      setNome('');
      setTipo('');
      setImagem('');
    } catch (error) {
      console.error('Erro ao adicionar Pokémon:', error);
    }
  };

  // Atualizar Pokémon
  const atualizarPokemon = async () => {
    try {
      await axios.put(`https://pokeworld-backend.onrender.com/pokemons/${editarId}`, {
        nome,
        tipo,
        imagem,
      });
      carregarPokemons();
      setEditarId(null);
      setNome('');
      setTipo('');
      setImagem('');
    } catch (error) {
      console.error('Erro ao atualizar Pokémon:', error);
    }
  };

  // Deletar Pokémon
  const deletarPokemon = async (id) => {
    try {
      await axios.delete(`https://pokeworld-backend.onrender.com/pokemons/${id}`);
      carregarPokemons();
    } catch (error) {
      console.error('Erro ao deletar Pokémon:', error);
    }
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



  return (
    <div>
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
        </nav>
      </header>

      <h1>CRUD de Pokémons</h1>
      
      {/* Formulário para criar ou atualizar */}
      <div>
        <h3>{editarId ? 'Editar Pokémon' : 'Adicionar Pokémon'}</h3>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Imagem (URL)"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
        />
        {editarId ? (
          <button onClick={atualizarPokemon}>Atualizar Pokémon</button>
        ) : (
          <button onClick={adicionarPokemon}>Adicionar Pokémon</button>
        )}
      </div>

      {/* Listagem de Pokémons */}
      <div>
        <h3>Lista de Pokémons</h3>
        <ul>
          {pokemons.map((pokemon) => (
            <li key={pokemon.id}>
              <strong>Nome:</strong> {pokemon.nome} | <strong>Tipo:</strong> {pokemon.tipo} |{' '}
              <strong>Imagem:</strong>{' '}
              <img src={pokemon.imagem} alt={pokemon.nome} width={50} height={50} />
              <button onClick={() => {
                setEditarId(pokemon.id);
                setNome(pokemon.nome);
                setTipo(pokemon.tipo);
                setImagem(pokemon.imagem);
              }}>Editar</button>
              <button onClick={() => deletarPokemon(pokemon.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      </div>
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

          .form {
            margin: 20px 0;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            width: 400px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .form label {
            display: block;
            margin: 10px 0;
          }
            button{
            margin: 5px;
            }

          .tableUsuarios {
            margin-top: 40px;
            width: 70%;
            border-collapse: collapse;
            margin-bottom: 40px;
          }

          .tableUsuarios th, .tableUsuarios td {
            border: 1px solid #333;
            padding: 10px;
          }

          .tableUsuarios th {
            background-color: #007bff;
            color: white;
          }
        `}
      </style>
    </div>
  );
}

export default PokemonCrud;
