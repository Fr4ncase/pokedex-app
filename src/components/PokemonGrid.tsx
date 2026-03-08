// Components
import { PokemonCard } from '@/components/PokemonCard';
import { CustomScrollArea } from '@/components/CustomScrollArea';

// Types
import type { Pokemon } from '@/types';

// Interfaces
interface PokemonGridProps {
  pokemons: Pokemon[];
}

export function PokemonGrid({ pokemons }: PokemonGridProps) {
  return (
    <CustomScrollArea className='w-full flex-1 min-h-0'>
      <div className='flex flex-wrap justify-center w-full px-4'>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))}
      </div>
    </CustomScrollArea>
  );
}
