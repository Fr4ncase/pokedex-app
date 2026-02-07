// Types
import {
  PokemonDetailSchema,
  PokemonEvolutionChainSchema,
  PokemonSpeciesSchema,
} from '@/schemas/pokemon';

// API client
import { apiClient } from '@/api/client';

export const getPokemonList = async () => {
  const res = await fetch('/pokemon-basic.json');
  if (!res.ok) throw new Error('Failed to fetch pokemon data');
  return res.json();
};

export const getPokemonById = async (id: string) => {
  const [pokemonRes, speciesVarieties] = await Promise.all([
    apiClient.get(`/pokemon/${id}`),
    getPokemonSpeciesById(id),
    getPokemonEvolutionChainById(id),
  ]);

  const detail = PokemonDetailSchema.parse(pokemonRes.data);

  return {
    ...detail,
    forms: speciesVarieties.map((v) => ({ name: v.name })),
  };
};

export const getPokemonSpeciesById = async (id: string) => {
  const { data } = await apiClient.get(`/pokemon-species/${id}`);
  const parsed = PokemonSpeciesSchema.parse(data);
  return parsed.varieties.map((v) => ({
    name: v.pokemon.name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase()),
  }));
};

export const getPokemonEvolutionChainById = async (id: string) => {
  const { data } = await apiClient.get(`/evolution-chain/${id}`);
  const parsed = PokemonEvolutionChainSchema.parse(data);

  return parsed;
};
//https://pokeapi.co/api/v2/evolution-chain/1/
