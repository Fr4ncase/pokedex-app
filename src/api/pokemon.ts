// Types
import { PokemonDetailSchema } from '@/schemas/pokemon';
import type { PokemonDetail, PokemonBasic } from '@/schemas/pokemon';

// API client
import { apiClient } from '@/api/client';

export const getPokemonList = async (
  offset: number,
  limit: number,
): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBasic[];
}> => {
  // Obtener la lista básica
  const { data } = await apiClient.get(
    `/pokemon?limit=${limit}&offset=${offset}`,
  );

  // Hacer requests en paralelo - la API devuelve todo pero solo usamos lo necesario
  const pokemonPromises = data.results.map((pokemon: { url: string }) =>
    apiClient.get(pokemon.url),
  );

  const pokemonResponses = await Promise.all(pokemonPromises);

  // Extraer SOLO: id, name, url, types (ignorar stats, abilities, weight, height, etc)
  const pokemonList: PokemonBasic[] = pokemonResponses.map((response) => {
    return {
      id: response.data.id,
      name: response.data.name,
      url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}/`,
      types: response.data.types, // Solo extraemos types
    };
  });

  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: pokemonList,
  };
};

export const getPokemonById = async (id: string): Promise<PokemonDetail> => {
  const { data } = await apiClient.get(`/pokemon/${id}`);
  return PokemonDetailSchema.parse(data);
};
