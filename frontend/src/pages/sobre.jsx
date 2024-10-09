import React from 'react';
import pikachuImage from './imgs/pikachu.png';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

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

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">PokeWorld</h1>
        <nav>
          <button type="button" className='cadastrar' onClick={pokedexClick}>
            Pokedex
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
          <img src={pikachuImage} alt="Pikachu"/>
    
      </main>
      <style>
        {`            
          body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: white;
            background-image: none;
          }

          .app h1 {
            align-items: center;
            margin: 0 0 15px 0;
          }
          
          a{
            font-size: 35px;
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
            text-align: center;
          }

          .title {
            font-size: 36px;
            margin: 0;
          }

          .header nav {
            display: flex;
            justify-content: center;
            gap: 15px;
          }

          .header button {
            padding: 10px 20px;
            border-radius: 15px;
            background-color: #007bff;
            color: white;
            font-size: 16px;
            transition: background-color 0.3s ease;
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

          .pokemon-image {
            flex: 1;
            display: flex;
            align-items: unset;
            justify-content: center;
          }

          .pokemon-image img {
            max-width: 50%;
          }
        `}
      </style>
    </div>
  );
};

export default App;