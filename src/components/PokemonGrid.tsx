// Components
import { PokemonCard } from '@/components/PokemonCard';

// Types
import type { PokemonListItem } from '@/types/pokemon';

// Interfaces
interface PokemonGridProps {
  pokemons: PokemonListItem[];
}

export function PokemonGrid({ pokemons }: PokemonGridProps) {
  return (
    <main className='w-full flex-1 overflow-y-auto custom-scrollbar px-4'>
      <div className='grid grid-cols-[repeat(auto-fit,144px)] justify-center w-full'>
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
