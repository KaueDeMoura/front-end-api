import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pikachuImage from '../imgs/pikachu.png';
import userImage from '../imgs';

const App = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
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

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">PokeWorld</h1>
        <nav>
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

      <main className="conteudo">
        <section className="about">
          <a>Sobre a Nossa Página de Pokémons</a>
          <p>
            Bem-vindo à nossa página dedicada aos Pokémons! Nosso objetivo é que você consiga Pesquisar
            todos os Pokémons e itens do mundo dos pokemons. Queremos
            criar um espaço onde fãs de todas as idades possam explorar e
            aprender mais sobre o mundo incrível dos Pokémons!
          </p>
        </section>
        <img src={pikachuImage} alt="Pikachu" />
      </main>

      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: white;
          }

          .app {
            display: flex;
            flex-direction: column;
            align-items: center;
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

          .conteudo {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px;
            gap: 20px;
            width: 80%;
            max-width: 1200px;
          }

          .about {
            flex: 1;
            margin: 10vh 0 5vh 0;
          }

          .about p {
            font-size: 16px;
            line-height: 1.5;
          }
        `}
      </style>
    </div>
  );
};

export default App;
