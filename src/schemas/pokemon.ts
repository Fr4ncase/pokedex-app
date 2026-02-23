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

const PokemonSpeciesVarietySchema = z.object({
  is_default: z.boolean(),
  pokemon: z.object({
    name: z.string(),
  }),
});

export const PokemonSpeciesSchema = z.object({
  varieties: z.array(PokemonSpeciesVarietySchema),
});

const EvolutionDetailsSchema = z.object({
  min_level: z.number().nullable().optional(),
  trigger: z
    .object({
      name: z.string(),
      url: z.string().optional(),
    })
    .nullable()
    .optional(),
  item: z
    .object({
      name: z.string(),
      url: z.string().optional(),
    })
    .nullable()
    .optional(),
  held_item: z.object({ name: z.string() }).nullable().optional(),
  min_happiness: z.number().nullable().optional(),
  min_affection: z.number().nullable().optional(),
  min_beauty: z.number().nullable().optional(),
  known_move: z.object({ name: z.string() }).nullable().optional(),
  known_move_type: z.object({ name: z.string() }).nullable().optional(),
  location: z.object({ name: z.string() }).nullable().optional(),
  time_of_day: z.string().optional(),
  trade_species: z.object({ name: z.string() }).nullable().optional(),
  relative_physical_stats: z.number().nullable().optional(),
  gender: z.number().nullable().optional(),
  needs_overworld_rain: z.boolean().optional(),
  turn_upside_down: z.boolean().optional(),
});

type ChainLink = {
  species: { name: string };
  evolution_details: Array<z.infer<typeof EvolutionDetailsSchema>>;
  evolves_to: ChainLink[];
};

const ChainLinkSchema: z.ZodType<ChainLink> = z.lazy(() =>
  z.object({
    species: z.object({
      name: z.string(),
      url: z.string().optional(),
    }),
    evolution_details: z.array(EvolutionDetailsSchema).optional().default([]),
    evolves_to: z.array(ChainLinkSchema).optional().default([]),
  }),
);

export const PokemonEvolutionChainSchema = z.object({
  chain: ChainLinkSchema,
});

export type PokemonDetail = z.infer<typeof PokemonDetailSchema>;
export type PokemonSpecies = z.infer<typeof PokemonSpeciesSchema>;
export type PokemonEvolutionChain = z.infer<typeof PokemonEvolutionChainSchema>;
