// Node modules
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

// API
import { getPokemonList, getPokemonById } from '@/api/pokemon';

export const useInfinitePokemonList = () => {
  return useInfiniteQuery({
    queryKey: ['pokemon', 'infinite-list'],
    queryFn: ({ pageParam }) => getPokemonList(pageParam, 35),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;

      const nextOffset = allPages.length * 35;

      return nextOffset;
    },
  });
};

export const usePokemonDetail = (id: string) => {
  return useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => getPokemonById(id),
  });
};
