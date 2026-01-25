// Node modules
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

// Hooks
import { usePokemonList } from '@/hooks/usePokemon';

// Components
import { PokedexHeader } from '@/components/PokedexHeader';
import { PokemonGrid } from '@/components/PokemonGrid';

// Constants
export const Route = createFileRoute('/pokemon/')({
  component: PokemonGridComponent,
});

function PokemonGridComponent() {
  const { data, isLoading, error } = usePokemonList();
  const [search, setSearch] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredPokemon = data?.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
      pokemon.id.toString().includes(search),
  );

  return (
    <div className='h-screen flex flex-col'>
      <PokedexHeader
        search={search}
        onSearchChange={setSearch}
      />

      <PokemonGrid pokemons={filteredPokemon ?? []} />
    </div>
  );
}
