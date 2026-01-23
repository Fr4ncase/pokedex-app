import { z } from 'zod';

export const PokemonTypeSchema = z.object({
  type: z.object({
    name: z.string(),
  }),
});

export const PokemonListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const PokemonDetailSchema = z.object({
  type: z.object({
    name: z.string(),
  }),
});
