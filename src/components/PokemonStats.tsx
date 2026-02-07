// Types
import type { PokemonDetailView } from '@/types';

// Interfaces
interface PokemonStatsProps {
  pokemon: PokemonDetailView;
}

export const PokemonStats = ({ pokemon }: PokemonStatsProps) => {
  // Helper
  const STAT_NAMES = [
    'hp',
    'attack',
    'defense',
    'special-attack',
    'special-defense',
    'speed',
  ] as const;
  const getStat = (name: string) =>
    pokemon.stats?.find((s) => s.stat.name === name)?.base_stat ?? 0;
  const total = STAT_NAMES.reduce((sum, name) => sum + getStat(name), 0);
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
    <div className='flex flex-1 lg:max-w-1/4 xl:w-1/4 justify-center'>
      <div className='max-w-100 xl:max-w-full lg:perspective-normal'>
        <table className='table-fixed text-text-body w-full transform lg:-rotate-y-30 lg:hover:rotate-y-0 transition-transform duration-300'>
          <thead>
            <tr>
              <th className='w-22 xl:w-28'></th>
              <th className='text-center p-4'>
                <button className='cursor-pointer font-semibold'>Base</button>
              </th>
              <th className='text-center p-4'>
                <button className='cursor-pointer font-semibold'>Min</button>
              </th>
              <th className='text-center p-4'>
                <button className='cursor-pointer font-semibold'>Max</button>
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
                    style={{ width: `${(getStat('hp') / STAT_MAX) * 100}%` }}
                  >
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
                    style={{
                      width: `${(getStat('attack') / STAT_MAX) * 100}%`,
                    }}
                  >
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
                    style={{
                      width: `${(getStat('defense') / STAT_MAX) * 100}%`,
                    }}
                  >
                    <span className='pr-2 text-white'>
                      {getStat('defense')}
                    </span>
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
                    style={{
                      width: `${(getStat('special-attack') / STAT_MAX) * 100}%`,
                    }}
                  >
                    <span className='pr-2 text-white'>
                      {getStat('special-attack')}
                    </span>
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
                    style={{
                      width: `${(getStat('special-defense') / STAT_MAX) * 100}%`,
                    }}
                  >
                    <span className='pr-2 text-white'>
                      {getStat('special-defense')}
                    </span>
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
                    style={{ width: `${(getStat('speed') / STAT_MAX) * 100}%` }}
                  >
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
  );
};
