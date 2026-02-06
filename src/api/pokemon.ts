// Types
import { PokemonDetailSchema, PokemonSpeciesSchema } from '@/schemas/pokemon';

// API client
import { apiClient } from '@/api/client';

export const getPokemonById = async (id: string) => {
  const [pokemonRes, speciesVarieties] = await Promise.all([
    apiClient.get(`/pokemon/${id}`),
    getPokemonSpeciesById(id),
  ]);

  const detail = PokemonDetailSchema.parse(pokemonRes.data);

  return {
    ...detail,
    forms: speciesVarieties.map((v) => ({ name: v.name })),
  }
};

export const getPokemonSpeciesById = async (id: string) => {
  const { data } = await apiClient.get(`/pokemon-species/${id}`);
  const parsed = PokemonSpeciesSchema.parse(data);
  return parsed.varieties.map((v) => ({
    name: v.pokemon.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  }));
};