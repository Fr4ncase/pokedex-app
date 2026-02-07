// Components
import { PokemonTypeIcons } from '@/components/PokemonTypeIcons';

// Types
import type { PokemonDetailView } from '@/types';

// Interfaces
interface PokemonEvolutionChainProps {
  pokemon: PokemonDetailView;
  spriteUrl: string;
}

export const PokemonEvolutionChain = ({
  pokemon,
  spriteUrl,
}: PokemonEvolutionChainProps) => {
  return (
    <div className=''>
      <div className='flex justify-center'>
        <span className='text-2xl border rounded px-0.5 py-1 leading-none'>
          EVOLUTION CHAIN
        </span>
      </div>
      <div>
        <figure className='flex justify-center'>
          <img
            src={spriteUrl}
            alt={pokemon.name}
            className='w-32 h-auto'
          />
        </figure>
        <div className='flex flex-col items-center'>
          <span>#{pokemon.id}</span>
          <span className='border rounded px-0.5 py-1 w-fit leading-none'>
            {pokemon.name.toUpperCase()}
          </span>
        </div>
        <div>
          <PokemonTypeIcons
            types={pokemon.types}
            containerClassName='flex justify-center'
            iconClassName='w-5 h-5'
          />
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
