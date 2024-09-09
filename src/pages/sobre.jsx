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
        </nav>
      </header>

      <main className="conteudo">
        <section className="about">
          <a>Sobre a Nossa Página de Pokémons</a>
          <p>
          Bem-vindo à nossa página exclusiva dedicada ao universo Pokémon! Aqui, você poderá pesquisar e descobrir todos os Pokémons, 
          além de explorar os itens e curiosidades do vasto mundo Pokémon. Nossa missão é criar um espaço interativo e divertido, 
          onde fãs de todas as idades possam aproveita o universo Pokémon,
          aprender sobre seus pokemons favoritas,
          e ficar por dentro de todas as novidades. 
          Prepare-se para uma jornada cheia de aventuras e conhecimento no mundo Pokémon!
          </p>
        </section>
        <aside className="pokemon-image">
          <img src={pikachuImage} alt="Pikachu"/>
        </aside>
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
