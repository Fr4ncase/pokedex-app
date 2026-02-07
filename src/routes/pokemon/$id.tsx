// Node modules
import { createFileRoute, useParams } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

// Hooks
import { usePokemonData, usePokemonDetail } from '@/hooks/usePokemon';

// Components
import { Header } from '@/components/Header';
import { PokemonDetail } from '@/components/PokemonDetail';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Constants
export const Route = createFileRoute('/pokemon/$id')({
  component: PokemonDetailComponent,
});

function PokemonDetailComponent() {
  const { id } = useParams({ from: '/pokemon/$id' });
  const { data: list } = usePokemonData();
  const { data: detail, isLoading, error } = usePokemonDetail(id);

  const [search, setSearch] = useState('');

  const pokemon = useMemo(() => {
    if (!list || !detail) return null;
    const localPokemon = list.find((p) => p.id === Number(id));
    if (!localPokemon) return null;
    return { ...localPokemon, ...detail };
  }, [list, detail, id]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  if (!pokemon) return <LoadingSpinner />;

  return (
    <div className='h-screen flex flex-col'>
      <Header
        search={search}
        onSearchChange={setSearch}
      />

      <PokemonDetail pokemon={pokemon} />
    </div>
  );
}
