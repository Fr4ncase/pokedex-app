// Custom modules
import { typeIcons } from '@/assets/types';
import { typeColors } from '@/utils/pokemonColors';

// Utils
import { getSpeciesColorHex, getTextColorHex } from '@/utils/pokemonColors';

// Types
import type { PokemonDetailView } from '@/types';
import type { TypeName } from '@/types';
import type React from 'react';

// Interfaces
interface PokemonInfoProps {
  pokemon: PokemonDetailView;
}

export const PokemonInfo = ({ pokemon }: PokemonInfoProps) => {
  const speciesColorHex = getSpeciesColorHex(pokemon.speciesColor);
  const textColorHex = getTextColorHex(pokemon.speciesColor);

  return (
    <div className='flex flex-1 lg:max-w-1/4 xl:w-1/4 justify-center'>
      <div className='w-full lg:perspective-normal'>
        <table className='table-fixed text-text-body max-w-100 transform lg:rotate-y-30 lg:hover:rotate-y-0 transition-transform duration-300'>
          <tbody>
            <tr>
              <td className='w-15 xl:w-22 text-right font-semibold xl:px-3 py-3 leading-none whitespace-nowrap'>
                ID
              </td>
              <td className='pl-3 xl:px-3 py-3 leading-none'>#{pokemon.id}</td>
            </tr>
            <tr>
              <td className='w-15 xl:w-22 text-right font-semibold xl:px-3 py-3 leading-none whitespace-nowrap'>
                Height
              </td>
              <td className='pl-3 xl:px-3 py-3 leading-none'>
                {(pokemon.height / 10).toFixed(1)}m
              </td>
            </tr>
            <tr>
              <td className='w-15 xl:w-22 text-right font-semibold xl:px-3 py-3 leading-none whitespace-nowrap'>
                Weight
              </td>
              <td className='pl-3 xl:px-3 py-3 leading-none'>
                {(pokemon.weight / 10).toFixed(1)}kg
              </td>
            </tr>
            <tr>
              <td className='w-15 xl:w-22 text-right font-semibold xl:px-3 py-3 leading-none whitespace-nowrap'>
                Abilities
              </td>
              <td className='pl-3 xl:px-3 py-3'>
                <ul className='flex flex-wrap gap-x-2 gap-y-2'>
                  {pokemon.abilities.map((ability) => (
                    <li
                      key={ability.ability.name}
                      className='rounded w-fit p-1 capitalize leading-none'
                      style={{
                        backgroundColor: speciesColorHex,
                        color: textColorHex,
                      }}
                    >
                      {ability.ability.name.replace(/-/g, ' ')}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td className='w-15 xl:w-22 text-right font-semibold xl:px-3 py-3 leading-none whitespace-nowrap'>
                Type
              </td>
              <td className='pl-3 xl:px-3 py-3 leading-none'>
                <div className='flex gap-x-4 text-white'>
                  {pokemon.types.map((typeName) => {
                    const color = typeColors[typeName as TypeName];

                    return (
                      <div
                        key={typeName}
                        className='flex justify-between items-center rounded w-23 px-1 py-0.5 type-icon-info'
                        style={
                          {
                            backgroundColor: color,
                            '--tw-shadow-color': color,
                          } as React.CSSProperties
                        }
                      >
                        <span className='capitalize'>{typeName}</span>
                        <img
                          src={typeIcons[typeName as TypeName]}
                          alt={typeName}
                          className='w-6 h-6 object-contain rounded-full leading-none'
                        />
                      </div>
                    );
                  })}
                </div>
              </td>
            </tr>
            <tr>
              <td className='w-15 xl:w-22 text-right font-semibold xl:px-3 py-3 leading-none whitespace-nowrap'>
                Forms
              </td>
              <td className='pl-3 xl:px-3 py-3 align-top'>
                <div className='flex flex-wrap gap-x-2 gap-y-2'>
                  {pokemon.forms.map((form) => (
                    <span
                      key={form.name}
                      className='rounded w-fit p-1 capitalize leading-none'
                      style={{
                        backgroundColor: speciesColorHex,
                        color: textColorHex,
                      }}
                    >
                      {form.name}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
