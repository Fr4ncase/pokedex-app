// Node modules
import { useQuery } from '@tanstack/react-query';

// Custom modules
import { getPokemonById, getPokemonList } from '@/api/pokemon';

// Types
import type { Pokemon } from '@/types';

export function usePokemonData() {
  return useQuery<Pokemon[]>({
    queryKey: ['pokemon-list'],
    queryFn: getPokemonList,
    staleTime: Infinity,
  });
}

export const usePokemonDetail = (id: string) => {
  return useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => getPokemonById(id),
  });
};
