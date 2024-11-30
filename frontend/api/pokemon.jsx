import api from './api';

export const listarPokemons = async (page = 1) => {
  const response = await api.get('/pokemons', {
    params: { page }, 
  });
  return response.data; 
};
