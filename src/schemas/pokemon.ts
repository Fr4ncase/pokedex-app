// Node modules
import { z } from 'zod';

export const PokemonDetailSchema = z.object({
  height: z.number(),
  weight: z.number(),
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string(),
      }),
    }),
  ),
  forms: z.array(
    z.object({
      name: z.string(),
    }),
  ),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      stat: z.object({
        name: z.string(),
      }),
    }),
  ),
});

export const PokemonSpeciesVarietySchema = z.object({
  is_default: z.boolean(),
  pokemon: z.object({
    name: z.string(),
  }),
});

export const PokemonSpeciesSchema = z.object({
  varieties: z.array(PokemonSpeciesVarietySchema),
});

export const PokemonEvolutionChainSchema = z.object({
  chain: z.object({
    species: z.object({
      name: z.string(),
    }),
    evolves_to: z.array(
      z.object({
        evolves_to: z.array(
          z.object({
            species: z.object({
              name: z.string(),
            }),
          }),
        ),
        species: z.object({
          name: z.string(),
        }),
      }),
    ),
  }),
});

export type PokemonDetail = z.infer<typeof PokemonDetailSchema>;
export type PokemonSpeciesVariety = z.infer<typeof PokemonSpeciesVarietySchema>;
export type PokemonSpecies = z.infer<typeof PokemonSpeciesSchema>;
export type PokemonEvolutionChain = z.infer<typeof PokemonEvolutionChainSchema>;
