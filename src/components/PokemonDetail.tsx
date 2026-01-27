// Schemas
import type { PokemonBasic } from '@/schemas/pokemon';

// Interfaces
interface PokemonCardProps {
  pokemon: PokemonBasic;
}

export const PokemonDetail = ({ pokemon }: PokemonCardProps) => {
  return (
    <main className='w-full flex-1 overflow-y-auto custom-scrollbar px-4'>
      <div className='w-full px-4'>
        <h1>{pokemon.name}</h1>
      </div>
    </main>
  );
};
