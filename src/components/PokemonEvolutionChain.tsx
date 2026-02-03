//Components
import { PokemonTypeIcons } from '@/components/PokemonTypeIcons';

// Schemas
import type { PokemonBasic } from '@/schemas/pokemon';

// Interfaces
interface PokemonCardProps {
  pokemon: PokemonBasic;
  spriteUrl: string;
}

export const PokemonEvolutionChain = ({
  pokemon,
  spriteUrl,
}: PokemonCardProps) => {
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
          <span>#1</span>
          <span>BULBASAUR</span>
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
