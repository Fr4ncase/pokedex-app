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
        <figure>
          <img
            src={spriteUrl}
            alt={pokemon.name}
          />
        </figure>
        <div>
          <span>#${pokemon.id}</span>
          <span>{pokemon.name.toUpperCase()}</span>
        </div>
        <div>
          <PokemonTypeIcons types={pokemon.types} />
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
