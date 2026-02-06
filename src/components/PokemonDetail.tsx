// Custom modules
import { typeIcons, typeColors } from '@/assets/types';

// Components
import { PokemonEvolutionChain } from '@/components/PokemonEvolutionChain';
import { PokemonTypeIcons } from '@/components/PokemonTypeIcons';

// Types
import type { PokemonDetailView } from '@/types';

// Interfaces
interface PokemonDetailProps {
  pokemon: PokemonDetailView;
}

export const PokemonDetail = ({ pokemon }: PokemonDetailProps) => {
  // Helper
  const STAT_NAMES = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'] as const;
  const getStat = (name: string) => pokemon.stats?.find((s) => s.stat.name === name)?.base_stat ?? 0;
  const total = STAT_NAMES.reduce((sum, name) => sum + getStat(name), 0);
  const imageUrl =
    pokemon.image?.startsWith('http') && pokemon.image.includes('official-artwork')
      ? pokemon.image
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const STAT_MAX = 255;
  const statRows: { key: string; label: string; statName: string }[] = [
    { key: 'hp', label: 'HP', statName: 'hp' },
    { key: 'attack', label: 'Attack', statName: 'attack' },
    { key: 'defense', label: 'Defence', statName: 'defense' },
    { key: 'sp-attack', label: 'Sp. Attack', statName: 'special-attack' },
    { key: 'sp-defense', label: 'Sp. Defence', statName: 'special-defense' },
    { key: 'speed', label: 'Speed', statName: 'speed' },
  ];

  return (
    <main className='w-full flex-1 overflow-y-auto custom-scrollbar'>
      <div className='w-full max-w-450 mx-auto px-4'>
        <h1 className='uppercase text-center text-[40px] text-pokedex-gray mt-5'>
          {pokemon.name}
        </h1>
        <div className='flex justify-center'>
          <span className='border rounded w-fit px-0.5 py-1 leading-none'>
            Seed Pokemon
          </span>
        </div>
        <div className='flex flex-col lg:flex-row justify-center items-center'>
          <div className='flex flex-1 lg:max-w-1/4 xl:w-1/4 justify-center'>
            <div className='w-full lg:perspective-normal'>
              <table className='table-fixed text-text-body max-w-100 transform lg:rotate-y-30 lg:hover:rotate-y-0 transition-transform duration-300'>
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
                    <ul className='flex flex-wrap gap-x-2 gap-y-2 leading-none'>
                      {pokemon.abilities.map((ability) => (
                        <li
                          key={ability.ability.name}
                          className='border rounded w-fit p-0.5'
                        >
                          {ability.ability.name.toUpperCase().replace(/-/g, ' ')}
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
                    <div className='flex gap-x-4'>
                      {pokemon.types.map((typeName) => {
                        const key = (typeof typeName === 'string' ? typeName : typeName).toLowerCase().replace(/\s/g, '-');
                        const color = typeColors[key as keyof typeof typeColors];
                        const iconSrc = typeIcons[key as keyof typeof typeIcons];
                        return (
                          <div
                            key={key}
                            className='rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-white font-medium capitalize shadow-md transition-shadow hover:shadow-lg'
                            style={{
                              backgroundColor: color ?? '#A8A878',
                              boxShadow: color ? `0 0 12px ${color}40` : undefined,
                            }}
                          >
                            <span>{key.replace(/-/g, ' ')}</span>
                            {iconSrc ? (
                              <img
                                src={iconSrc}
                                alt=''
                                width={20}
                                height={20}
                                className='size-5 shrink-0 block object-contain opacity-90'
                                style={{ filter: 'brightness(0) invert(1)' }}
                              />
                            ) : null}
                          </div>
                        )
                      })}
                      <div className='border rounded w-fit px-0.5 py-1'>
                        <span>{pokemon.types}</span>
                        <PokemonTypeIcons types={pokemon.types} />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='w-15 xl:w-22 text-right font-semibold xl:px-3 py-3 align-top leading-none whitespace-nowrap'>
                    Forms
                  </td>
                  <td className='pl-3 xl:px-3 py-3 align-top'>
                    <div className='flex flex-wrap gap-x-2 gap-y-2 leading-none'>
                      {pokemon.forms.map((form) => (
                        <span
                          key={form.name}
                          className='border rounded w-fit p-0.5'
                        >
                          {form.name.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className='flex flex-1 max-w-full lg:max-w-2/5 justify-center'>
            <img
              src={imageUrl}
              alt={pokemon.name}
              className='w-full h-auto object-contain'
            />
          </div>
          <div className='flex flex-1 lg:max-w-1/4 xl:w-1/4 justify-center'>
            <div className='max-w-100 xl:max-w-full lg:perspective-normal'>
              <table className='table-fixed text-text-body w-full transform lg:-rotate-y-30 lg:hover:rotate-y-0 transition-transform duration-300'>
                <thead>
                  <tr>
                    <th className='w-22 xl:w-28'></th>
                    <th className='text-center p-4'>
                      <button className='cursor-pointer font-semibold'>
                        Base
                      </button>
                    </th>
                    <th className='text-center p-4'>
                      <button className='cursor-pointer font-semibold'>
                        Min
                      </button>
                    </th>
                    <th className='text-center p-4'>
                      <button className='cursor-pointer font-semibold'>
                        Max
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='text-right font-semibold xl:px-3 py-3 leading-none whitespace-nowrap'>
                      HP
                    </td>
                    <td
                      colSpan={3}
                      className='w-full pl-3 xl:px-3 py-3'
                    >
                      <div className='w-full h-4 bg-gray-200 rounded overflow-hidden shadow-inner'>
                        <div
                          className='flex items-center justify-end bg-[#81c784] h-full w-3/4 leading-none animate-stripes duration-400'
                          style={{ width: `${(getStat('hp') / STAT_MAX) * 100}%` }}>
                          <span className='pr-2 text-white'>{getStat('hp')}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right font-semibold xl:px-3 py-3 leading-none whitespace-nowrap'>
                      Attack
                    </td>
                    <td
                      colSpan={3}
                      className='w-full pl-3 xl:px-3 py-3'
                    >
                      <div className='w-full h-4 bg-gray-200 rounded overflow-hidden shadow-inner'>
                        <div
                          className='flex items-center justify-end bg-[#81c784] h-full w-3/4 leading-none animate-stripes duration-400'
                          style={{ width: `${(getStat('attack') / STAT_MAX) * 100}%` }}>
                          <span className='pr-2 text-white'>{getStat('attack')}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right font-semibold xl:px-3 py-3 leading-none whitespace-nowrap'>
                      Defence
                    </td>
                    <td
                      colSpan={3}
                      className='w-full pl-3 xl:px-3 py-3'
                    >
                      <div className='w-full h-4 bg-gray-200 rounded overflow-hidden shadow-inner'>
                        <div
                          className='flex items-center justify-end bg-[#81c784] h-full w-3/4 leading-none animate-stripes duration-400'
                          style={{ width: `${(getStat('defense') / STAT_MAX) * 100}%` }}>
                          <span className='pr-2 text-white'>{getStat('defense')}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right font-semibold xl:px-3 py-3 leading-none whitespace-nowrap'>
                      Sp.Attack
                    </td>
                    <td
                      colSpan={3}
                      className='w-full pl-3 xl:px-3 py-3'
                    >
                      <div className='w-full h-4 bg-gray-200 rounded overflow-hidden shadow-inner'>
                        <div
                          className='flex items-center justify-end bg-[#81c784] h-full w-3/4 leading-none animate-stripes duration-400'
                          style={{ width: `${(getStat('special-attack') / STAT_MAX) * 100}%` }}>
                          <span className='pr-2 text-white'>{getStat('special-attack')}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right font-semibold xl:px-3 py-3 leading-none whitespace-nowrap'>
                      Sp.Defence
                    </td>
                    <td
                      colSpan={3}
                      className='w-full pl-3 xl:px-3 py-3'
                    >
                      <div className='w-full h-4 bg-gray-200 rounded overflow-hidden shadow-inner'>
                        <div
                          className='flex items-center justify-end bg-[#81c784] h-full w-3/4 leading-none animate-stripes duration-400'
                          style={{ width: `${(getStat('special-defense') / STAT_MAX) * 100}%` }}>
                          <span className='pr-2 text-white'>{getStat('special-defense')}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right font-semibold xl:px-3 py-3 leading-none whitespace-nowrap'>
                      Speed
                    </td>
                    <td
                      colSpan={3}
                      className='w-full pl-3 xl:px-3 py-3'
                    >
                      <div className='w-full h-4 bg-gray-200 rounded overflow-hidden shadow-inner'>
                        <div
                          className='flex items-center justify-end bg-[#81c784] h-full w-3/4 leading-none animate-stripes duration-400'
                          style={{ width: `${(getStat('speed') / STAT_MAX) * 100}%` }}>
                          <span className='pr-2 text-white'>{getStat('speed')}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right font-semibold xl:px-3 py-3 leading-none'>
                      Total
                    </td>
                    <td
                      colSpan={3}
                      className='pl-3 xl:px-3 py-3 leading-none'
                    >
                      {total}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <PokemonEvolutionChain pokemon={pokemon} spriteUrl={imageUrl} />
      </div>
    </main>
  );
};
