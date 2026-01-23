// Node modules
import { useQuery } from '@tanstack/react-query';

// API
import { getPokemonList, getPokemonById } from '@/api/pokemon';

export const usePokemonList = () => {
  return useQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: getPokemonList,
  });
};

export const usePokemonDetail = (id: string) => {
  return useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => getPokemonById(id),
  });
};
