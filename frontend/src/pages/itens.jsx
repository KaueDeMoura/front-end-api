import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [filtroItens, setFiltroitens] = useState([]);
  const [procQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/item?limit=90');
        if (!response.ok) {
          throw new Error('HTTP error! Status: ' + response.status);
        }
        const data = await response.json();

        const detailedItems = await Promise.all(
          data.results.map(async (item) => {
            const itemResponse = await fetch(item.url);
            const itemData = await itemResponse.json();
            return {
              name: item.name.toUpperCase(),
              image: itemData.sprites.default,
            };
          })
        );

        setItems(detailedItems);
        setFiltroitens(detailedItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }
    fetchItems();
  }, []);

  useEffect(() => {
    const results = items.filter(item =>
      item.name.toLowerCase().includes(procQuery.toLowerCase())
    );
    setFiltroitens(results);
  }, [procQuery, items]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sobreClick = () => {
    navigate('/sobre');
  };
  
  const pokedexClick = () => {
    navigate('/pokedex');
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

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">PokeWorld Itens</h1>
        <nav>
          <button type="button" className='cadastrar' onClick={sobreClick}>
            Sobre
          </button>
          <button type="button" className='cadastrar' onClick={pokedexClick}>
            Pokedex
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
          
          .item-list {
            display: grid;
            grid-template-columns: repeat(6, 1fr); /* Ajustado para 7 itens por linha */
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
