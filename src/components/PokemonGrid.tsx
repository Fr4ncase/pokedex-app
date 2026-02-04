// Node modules

// Components
import { PokemonCard } from '@/components/PokemonCard';

// Types
import type { Pokemon } from '@/types';

// Interfaces
interface PokemonGridProps {
  pokemons: Pokemon[];
}

export function PokemonGrid({ pokemons }: PokemonGridProps) {
  return (
    <main className='w-full flex-1 overflow-y-auto custom-scrollbar px-4'>
      <div className='flex flex-wrap justify-center w-full'>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))}
      </div>
    </main>
  );
}
