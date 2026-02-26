// Utils
import { getSpeciesColorHex, getTextColorHex } from '@/utils/pokemonColors';

// Types
import type { PokemonDetailView } from '@/types';

// Interfaces
interface PokemonEntriesProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: PokemonDetailView;
}

export const PokemonEntries = ({
  isOpen,
  onClose,
  pokemon,
}: PokemonEntriesProps) => {
  if (!isOpen) return null;
  const speciesColorHex = getSpeciesColorHex(pokemon.speciesColor);
  const textColorHex = getTextColorHex(pokemon.speciesColor);
  console.log(pokemon.flavorText?.[0]?.flavor_text);

  return (
    <div className='relative flex justify-center p-2 w-full z-10'>
      <div className='absolute flex flex-col items-center w-full h-fit p-2 bg-white border border-neutral-400 rounded shadow-sm'>
        <div className='flex flex-col items-center w-full mb-4'>
          <h2 className='mt-4 mb-2 uppercase text-text-body text-xl leading-none'>
            {pokemon.name}
          </h2>
          <span
            className='rounded px-1 py-0.5 mb-4'
            style={{
              backgroundColor: speciesColorHex,
              color: textColorHex,
            }}
          >
            Pokédex Entries
          </span>
          <div className='bg-neutral-400 w-[calc(100%+1rem)] -mx-2 h-px'></div>
        </div>
        {pokemon.flavorText.map((entry, index) => {
          console.log(entry);
          return (
            <div
              key={index}
              className='flex flex-col items-center text-center'
            >
              <div
                className='rounded leading-none p-0.5 mb-1'
                style={{
                  background: speciesColorHex,
                  color: textColorHex,
                }}
              >
                {entry.version.name}
              </div>
              <div className='leading-none mb-4'>{entry.flavor_text}</div>
            </div>
          );
        })}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
