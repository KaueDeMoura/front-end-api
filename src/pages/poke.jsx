import { useEffect, useState } from 'react';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=25');
        const data = await response.json();

        // Para cada Pokémon, buscar os detalhes
        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );

        setPokemons(detailedPokemons);
      } catch (error) {
        console.error("Error fetching Pokemons:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '50px' }}>
      <h1>Pokedex</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {pokemons.map((pokemon, index) => (
          <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ width: '100px', 
                height: '100px', 
                backgroundColor: '#f2f2f2', 
                borderRadius: '10px', 
              }}
            />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
