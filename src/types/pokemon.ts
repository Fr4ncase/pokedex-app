// Node modules
import { z } from 'zod';

export const PokemonTypeSchema = z.object({
  type: z.object({
    name: z.string(),
  }),
});

export const PokemonListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(PokemonTypeSchema),
  sprites: z.object({
    other: z.object({
      'official-artwork': z.object({
        front_default: z.string().nullable(),
      }),
    }),
  }),
});

export const PokemonDetailSchema = PokemonListItemSchema.extend({
  height: z.number(),
  weight: z.number(),
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string(),
      }),
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

export type PokemonType = z.infer<typeof PokemonTypeSchema>;
export type PokemonListItem = z.infer<typeof PokemonListItemSchema>;
export type PokemonDetail = z.infer<typeof PokemonDetailSchema>;
