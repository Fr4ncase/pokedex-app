// Schemas
import type { PokemonBasic } from '@/schemas/pokemon';

// Interfaces
interface PokemonCardProps {
  pokemon: PokemonBasic;
}

export const PokemonDetail = ({ pokemon }: PokemonCardProps) => {
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <main className='w-full flex-1 overflow-y-auto custom-scrollbar px-4'>
      <div className='w-full px-4'>
        <h1 className='uppercase text-center text-[40px] text-pokedex-gray mt-5'>
          {pokemon.name}
        </h1>
        <div className='flex justify-center'>
          <span className='border rounded w-fit px-1'>Poison Pin Pokemon</span>
        </div>
        <div className='flex justify-center'>
          <div className='w-88 h-75'>
            <div></div>
          </div>
          <div className='flex justify-center'>
            <img
              src={spriteUrl}
              alt={pokemon.name}
              className='object-contain'
            />
          </div>
          <div className='w-88 h-75'>
            <div></div>
          </div>
        </div>
        <div>
          <div className='flex justify-center'>
            <span className='text-2xl border rounded px-1'>
              EVOLUTION CHAIN
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};
