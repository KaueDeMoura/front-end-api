import api from './api'

export const criarPokemon = async (pokemon) => {
  const response = await api.post('api/v1/pokemon', pokemon);
  return response.data;
};

export const alterarPokemon = async (id, pokemon) => {
  const response = await api.put(`api/v1/pokemon/${id}`, pokemon);
  return response.data;
};

export const deletarPokemon = async (id) => {
  await api.delete(`api/v1/pokemon/${id}`);
};

export const listarPokemonPorId = async (id) => {
  const response = await api.get(`api/v1/pokemon/${id}`);
  return response.data;
};

export const listarPokemons = async (page = 1) => {
  const response = await api.get('api/v1/pokemon', {
    params: { page },
  });
  return response.data;
};