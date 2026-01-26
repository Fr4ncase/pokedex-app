// Node modules
import { createFileRoute } from '@tanstack/react-router';
import { useState, useMemo, useDeferredValue } from 'react';

// Hooks
import { useInfinitePokemonList } from '@/hooks/usePokemon';

// Components
import { PokedexHeader } from '@/components/PokedexHeader';
import { PokemonGrid } from '@/components/PokemonGrid';

// Constants
export const Route = createFileRoute('/pokemon/')({
  component: PokemonGridComponent,
});

function PokemonGridComponent() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePokemonList();

  const [search, setSearch] = useState('');
  
  // Diferir el valor de búsqueda para no bloquear el input
  const deferredSearch = useDeferredValue(search);

  const allPokemon = data?.pages.flatMap((page) => page.results) ?? [];

  // Memorizar el filtrado para evitar recalcular en cada render
  const filteredPokemon = useMemo(() => {
    // Si no hay búsqueda, devolver todos
    if (!deferredSearch.trim()) return allPokemon;
    
    const searchLower = deferredSearch.toLowerCase();
    
    return allPokemon.filter((pokemon) => {
      // Buscar por ID (más rápido, verificar primero)
      if (pokemon.id.toString().includes(deferredSearch)) return true;
      
      // Buscar por nombre
      return pokemon.name.toLowerCase().includes(searchLower);
    });
  }, [allPokemon, deferredSearch]);

  // Checks DESPUÉS de todos los hooks
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='h-screen flex flex-col'>
      <PokedexHeader
        search={search}
        onSearchChange={setSearch}
      />

      <PokemonGrid
        pokemons={filteredPokemon}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
