import api from './api';

export const listarPokemons = async (page = 1) => {
  const response = await api.get('/pokemons', {
    params: { page },
  });
  return response.data;
};

export const listarItens = async () => {
  const response = await api.get('/itens');
  return response.data;
};
