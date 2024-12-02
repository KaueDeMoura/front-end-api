import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarPokemons, listarItens } from '../../../api/pokemon';
import userImage from '../imgs/iconuser.png';

const App = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filtroItens, setFiltroitens] = useState([]);
  const [procQuery, setSearchQuery] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await listarItens(); // Usar a API do backend para buscar itens
        setItems(data);
        setFiltroitens(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }
    fetchItems();
  }, []);

  useEffect(() => {
    const results = items.filter((item) =>
      item.name.toLowerCase().includes(procQuery.toLowerCase())
    );
    setFiltroitens(results);
  }, [procQuery, items]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const sobre = () => navigate('/sobre');
  const pokedexClick = () => navigate('/pokedex');
  const itensClick = () => navigate('/itens');
  const sobreNosClick = () => navigate('/sobreNos');
  const adminpage = () => navigate('/admin/crud');
  const logout = () => {
    localStorage.clear('token');
    navigate('/login');
  };
  const alterarDados = () => navigate('/alterarDados');

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
      <main className="main-content">
        <section className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar itens..."
            value={procQuery}
            onChange={handleSearchChange}
          />
        </section>
        <section className="item-list">
          {filtroItens.map((item) => (
            <div key={item.name} className="item">
              <img src={item.image} alt={item.name} />
              <p><strong>{item.name}</strong></p>
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

          .item-list {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 20px;
          }

          .item {
            background-color: #f9f9f9;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            text-align: center;
          }

          .item img {
            max-width: 100px;
            max-height: 100px;
            margin-bottom: 10px;
          }

          .item p {
            margin: 0;
            font-size: 14px;
          }
        `}
      </style>
    </div>
  );
};

export default App;

