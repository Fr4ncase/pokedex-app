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

const getPokemonSpeciesWithEvolution = async (id: string) => {
  const { data } = await apiClient.get(`/pokemon-species/${id}`);
  const parsed = PokemonSpeciesSchema.parse(data);
  const evolutionChainUrl = (data as { evolution_chain?: { url: string } })
    .evolution_chain?.url;
  const evolutionChainId = evolutionChainUrl?.match(/\/(\d+)\/?$/)?.[1] ?? null;
  const speciesColor =
    (data as { color?: { name: string } }).color?.name ?? 'gray';
  return {
    varieties: parsed.varieties.map((v) => ({
      name: v.pokemon.name
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
    })),
    evolutionChainId,
    speciesColor,
  };
};

const getPokemonEvolutionChainById = async (evolutionChainId: string) => {
  const { data } = await apiClient.get(`/evolution-chain/${evolutionChainId}`);
  const parsed = PokemonEvolutionChainSchema.parse(data);
  return parsed;
};

export const getPokemonById = async (id: string) => {
  const speciesData = await getPokemonSpeciesWithEvolution(id);
  const { varieties, evolutionChainId } = speciesData;

  const [pokemonRes, parsedEvolutionChain] = await Promise.all([
    apiClient.get(`/pokemon/${id}`),
    evolutionChainId != null
      ? getPokemonEvolutionChainById(evolutionChainId)
      : Promise.resolve({
          chain: {
            species: { name: '', url: undefined },
            evolution_details: [],
            evolves_to: [],
          },
        }),
  ]);

  const detail = PokemonDetailSchema.parse(pokemonRes.data);

  return {
    ...detail,
    forms: varieties.map((v) => ({ name: v.name })),
    evolutionChain: parsedEvolutionChain,
    speciesColor: speciesData.speciesColor,
  };
};
