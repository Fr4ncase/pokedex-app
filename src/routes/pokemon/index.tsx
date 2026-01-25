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

  // El navbar debe tener un height de 56px cuando sea mayor a 768px y de
  // 32px cuando sea menor a 768px

  return (
    <div className=''>
      <header className='bg-white w-full h-9 sm:h-15 shadow-[0_0_40px_8px_rgba(0,0,0,0.18)]'>
        <nav className='flex justify-between items-center h-full px-8 py-2'>
          <SearchBar
            value={search}
            onChange={setSearch}
          />
          <h1 className='text-xl sm:text-3xl text-gray-500'>PokéDex</h1>
        </nav>
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
