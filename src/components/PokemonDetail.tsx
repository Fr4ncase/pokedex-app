// Node modules
import { useState } from 'react';
import { createPortal } from 'react-dom';

// Components
import { PokemonEvolutionChain } from '@/components/PokemonEvolutionChain';
import { PokemonStats } from '@/components/PokemonStats';
import { PokemonInfo } from '@/components/PokemonInfo';
import { PokemonEntries } from '@/components/PokemonEntries';

// Types
import type { Pokemon, PokemonDetailView } from '@/types';

// Utils
import { getSpeciesColorHex, getTextColorHex } from '@/utils/pokemonColors';

// Interfaces
interface PokemonDetailProps {
  pokemon: PokemonDetailView;
  pokemonList?: Pokemon[];
}

// Constants
const OFFICIAL_ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

export const PokemonDetail = ({ pokemon, pokemonList }: PokemonDetailProps) => {
  const [isPokemonEntriesOpen, setIsPokemonEntriesOpen] = useState(false);
  const speciesColorHex = getSpeciesColorHex(pokemon.speciesColor);
  const textColorHex = getTextColorHex(pokemon.speciesColor);
  const imageUrl =
    pokemon.image?.startsWith('http') &&
    pokemon.image.includes('official-artwork')
      ? pokemon.image
      : `${OFFICIAL_ARTWORK_URL}/${pokemon.id}.png`;

  const toggleModal = () => {
    setIsPokemonEntriesOpen(!isPokemonEntriesOpen);
  };

  return (
    <main className='w-full flex-1 overflow-y-auto custom-scrollbar'>
      <div className='w-full max-w-450 mx-auto px-4'>
        <h1 className='uppercase text-center text-[40px] text-pokedex-gray mt-5'>
          {pokemon.name}
        </h1>
        <div className='flex justify-center'>
          <button
            className='rounded w-fit px-0.5 py-1 leading-none cursor-pointer'
            style={{
              backgroundColor: speciesColorHex,
              color: textColorHex,
            }}
            onClick={toggleModal}
          >
            {pokemon.genera?.[0]?.genus}
          </button>
        </div>
        <div className='flex flex-col lg:flex-row justify-center items-center'>
          <PokemonInfo pokemon={pokemon} />
          <div className='flex flex-1 max-w-full lg:max-w-2/5 justify-center'>
            <img
              src={imageUrl}
              alt={pokemon.name}
              className='w-full h-auto object-contain'
            />
          </div>
          <PokemonStats pokemon={pokemon} />
        </div>
        <PokemonEvolutionChain
          pokemon={pokemon}
          pokemonList={pokemonList}
        />
        {createPortal(
          <PokemonEntries
            isOpen={isPokemonEntriesOpen}
            onClose={() => setIsPokemonEntriesOpen(false)}
            pokemon={pokemon}
          />,
          document.body,
        )}
      </div>
    </main>
  );
};
