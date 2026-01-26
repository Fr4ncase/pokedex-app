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

export const PokemonBasicSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  types: z.array(PokemonTypeSchema),
});

export const PokemonPageSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z
    .array(
      z.object({
        name: z.string(),
        url: z.string(),
      }),
    )
    .transform((results) =>
      results.map((pokemon) => {
        const id = parseInt(
          pokemon.url.split('/').filter(Boolean).pop() || '0',
        );
        return {
          id,
          name: pokemon.name,
          url: pokemon.url,
        };
      }),
    ),
});

export type PokemonType = z.infer<typeof PokemonTypeSchema>;
export type PokemonListItem = z.infer<typeof PokemonListItemSchema>;
export type PokemonDetail = z.infer<typeof PokemonDetailSchema>;
export type PokemonBasic = z.infer<typeof PokemonBasicSchema>;
export type PokemonPage = z.infer<typeof PokemonPageSchema>;
