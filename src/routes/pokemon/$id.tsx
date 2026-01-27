// Node modules
import { createFileRoute, useParams } from '@tanstack/react-router';
import { useState } from 'react';

// Hooks
import { usePokemonDetail } from '@/hooks/usePokemon';

// Components
import { PokedexHeader } from '@/components/PokedexHeader';
import { PokemonDetail } from '@/components/PokemonDetail';

// Constants
export const Route = createFileRoute('/pokemon/$id')({
  component: PokemonDetailComponent,
});

function PokemonDetailComponent() {
  const { id } = useParams({ from: '/pokemon/$id' });
  const { data, isLoading, error } = usePokemonDetail(id);

  const [search, setSearch] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='h-screen flex flex-col'>
      <PokedexHeader
        search={search}
        onSearchChange={setSearch}
      />

      <PokemonDetail pokemon={data} />
    </div>
  );
}
