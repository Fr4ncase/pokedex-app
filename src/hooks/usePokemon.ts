// Node modules
import { useQuery } from '@tanstack/react-query';

// Types
import type { Pokemon } from '@/types';

export function usePokemonData() {
  return useQuery<Pokemon[]>({
    queryKey: ['pokemon-list'],
    queryFn: async () => {
      const res = await fetch('/pokemon-basic.json');
      if (!res.ok) throw new Error('Failed to fetch pokemon data');
      return res.json();
    },
    staleTime: Infinity,
  });
}

// export const usePokemonDetail = (id: string) => {
//   return useQuery({
//     queryKey: ['pokemon', 'detail', id],
//     queryFn: () => getPokemonById(id),
//   });
// };
