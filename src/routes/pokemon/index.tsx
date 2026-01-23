// Node modules
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

// Hooks
import { usePokemonList } from '@/hooks/usePokemon';

// Components
import { PokemonCard } from '@/components/PokemonCard';
import { SearchBar } from '@/components/SearchBar';

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
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow p-4'>
        <div className='container mx-auto flex justify-between items-center'>
          <SearchBar
            value={search}
            onChange={setSearch}
          />
          <h1 className='text-3xl font-bold text-gray-700'>PokéDex</h1>
        </div>
      </header>

      <div className='container mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4'>
          {filteredPokemon?.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
