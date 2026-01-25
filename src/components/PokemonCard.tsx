// Node modules
import { Link } from '@tanstack/react-router';

// Custom modules
import { typeIcons, typeColors } from '@/assets/types';

// Types
import type { PokemonListItem } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Link
      to='/pokemon/$id'
      params={{ id: pokemon.id.toString() }}
      className='group block w-36 h-48 border border-black/10 hover:bg-hover-gray transition-colors duration-1000 ease-in hover:duration-100'
    >
      <div className='p-[0.5rem_0.3rem_0.3rem] flex flex-col h-full'>
        <div className='flex justify-between items-start'>
          <div className='flex flex-col flex-1 min-w-0'>
            <span className='text-3xl text-pokedex-gray leading-none'>
              {pokemon.id}
            </span>
            <span className=' capitalize text-pokedex-gray text-lg truncate mt-1'>
              {pokemon.name}
            </span>
          </div>
          <div className='flex flex-col gap-1'>
            {pokemon.types.map((typeSlot) => {
              const typeName = typeSlot.type.name;
              const color = typeColors[typeName];

              return (
                <img
                  key={typeName}
                  src={typeIcons[typeName]}
                  alt={`Type ${typeName}`}
                  title={typeName}
                  className='w-7.5 h-7.5 object-contain type-icon-hover rounded-full'
                  style={
                    {
                      '--tw-shadow-color': color,
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </div>
        </div>
        <div className='flex-1 flex items-center justify-center mt-1'>
          {pokemon.sprites.other['official-artwork'].front_default ? (
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className='w-28 h-28 object-contain transition-transform duration-300 group-hover:scale-110'
              style={{
                imageRendering: 'auto',
                filter: `
                  drop-shadow(1px 1px 0px rgba(0,0,0,0.2)) 
                  drop-shadow(-1px -1px 0px rgba(0,0,0,0.2))
                  drop-shadow(1px -1px 0px rgba(0,0,0,0.2))
                  drop-shadow(-1px 1px 0px rgba(0,0,0,0.2))
                `,
              }}
              loading='lazy'
            />
          ) : (
            <div className='text-gray-300'>No Image</div>
          )}
        </div>
      </div>
    </Link>
  );
};
