import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Bem-vindo ao Mundo Pokémon!</h1>
      <p>
        Este é um site dedicado a informações sobre os Pokémons. Aqui você pode explorar os detalhes dos seus Pokémons favoritos.
      </p>
      <Link to="/pokedex">
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Ver Pokémons
        </button>
      </Link>
    </div>
  );
}

export default Home;
