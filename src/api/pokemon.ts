// Types
import { PokemonListItemSchema, PokemonDetailSchema } from '@/types/pokemon';
import type { PokemonListItem, PokemonDetail } from '@/types/pokemon';

// API client
import { apiClient } from '@/api/client';

export const getPokemonList = async (): Promise<PokemonListItem[]> => {
  const { data } = await apiClient.get('/pokemon?limit=151');
  const pokemonPromises = data.results.map((pokemon: { url: string }) =>
    apiClient.get(pokemon.url),
  );
  const pokemonResponses = await Promise.all(pokemonPromises);
  const pokemonList = pokemonResponses.map((response) => {
    return PokemonListItemSchema.parse(response.data);
  });

  return pokemonList;
};

export const getPokemonById = async (id: string): Promise<PokemonDetail> => {
  const { data } = await apiClient.get(`/pokemon/${id}`);
  return PokemonDetailSchema.parse(data);
};
