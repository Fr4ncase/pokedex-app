// Node modules
import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

// Hooks
import { usePokemonData } from '@/hooks/usePokemon';

// Components
import { PokedexHeader } from '@/components/PokedexHeader';
import { PokemonGrid } from '@/components/PokemonGrid';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Constants
export const Route = createFileRoute('/pokemon/')({
  component: PokemonGridComponent,
});

// Types
import type { Pokemon } from '@/types';

function PokemonGridComponent() {
  const { data, isLoading, error } = usePokemonData();
  const [search, setSearch] = useState('');

  const filteredPokemon = useMemo(() => {
    if (!data) return [];
    if (!search) return data;

    const searchLower = search.toLowerCase();
    return data.filter(
      (pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(searchLower) ||
        pokemon.id.toString().includes(search),
    );
  }, [data, search]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='h-screen flex flex-col'>
      <PokedexHeader
        search={search}
        onSearchChange={setSearch}
      />

      <PokemonGrid pokemons={filteredPokemon} />
    </div>
  );
}
