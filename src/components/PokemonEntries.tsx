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

  return (
    <div className='fixed inset-0 flex justify-center p-2'>
      <div className='flex flex-col w-full sm:w-lg py-2 px-0 bg-white border border-neutral-400 rounded shadow-sm'>
        <div className='flex flex-col shrink-0 items-center w-full mb-4'>
          <h2 className='mt-2 mb-2 uppercase text-text-body text-xl leading-none'>
            {pokemon.name}
          </h2>
          <span
            className='rounded px-1 py-0.5'
            style={{
              backgroundColor: speciesColorHex,
              color: textColorHex,
            }}
          >
            Pokédex Entries
          </span>
        </div>
        <div className='shrink-0 w-full border-t border-neutral-400' />
        <div
          className='flex flex-1 flex-col items-center w-full min-h-0 overflow-y-auto custom-scrollbar'
          style={{ overflowY: 'overlay' }}
        >
          <div className='w-full px-4 mt-5'>
            {pokemon.flavorText.map((entry, index) => (
              <div
                key={index}
                className='flex flex-col items-center text-center'
              >
                <div
                  className='p-1 mb-1 text-xl capitalize rounded leading-none '
                  style={{
                    background: speciesColorHex,
                    color: textColorHex,
                  }}
                >
                  Pokémon {entry.version.name}
                </div>
                <div className='mb-5 text-text-body leading-5'>
                  {entry.flavor_text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='shrink-0 w-full mb-4 border-t border-neutral-400' />
        <div className='flex justify-center w-full px-4 pb-2'>
          <button
            className='w-fit px-4 py-2 text-white bg-[#6c757d] rounded leading-none cursor-pointer'
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
