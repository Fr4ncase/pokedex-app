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
        <div className='flex flex-col lg:flex-row justify-center items-center'>
          <div className='flex flex-1 w-80 lg:max-w-1/4 justify-center'>
            <div className='w-full lg:perspective-normal'>
              <table className='table-fixed text-pokedex-gray w-full transform lg:rotate-y-30 lg:hover:rotate-y-0 transition-transform duration-300'>
                <tr>
                  <td className='w-15 xl:w-22 text-right font-bold xl:px-3 py-3 leading-none whitespace-nowrap'>
                    ID
                  </td>
                  <td className='pl-3 xl:px-3 py-3 leading-none'>#1</td>
                </tr>
                <tr>
                  <td className='w-15 xl:w-22 text-right font-bold xl:px-3 py-3 leading-none whitespace-nowrap'>
                    Height
                  </td>
                  <td className='pl-3 xl:px-3 py-3 leading-none'>
                    0.7m ( 2'4" )
                  </td>
                </tr>
                <tr>
                  <td className='w-15 xl:w-22 text-right font-bold xl:px-3 py-3 leading-none whitespace-nowrap'>
                    Weight
                  </td>
                  <td className='pl-3 xl:px-3 py-3 leading-none'>
                    6.9kg ( 15.2 lbs )
                  </td>
                </tr>
                <tr>
                  <td className='w-15 xl:w-22 text-right font-bold xl:px-3 py-3 leading-none whitespace-nowrap'>
                    Abilities
                  </td>
                  <td className='pl-3 xl:px-3 py-3 leading-none'>
                    <ul className='flex gap-x-2'>
                      <li className='border rounded w-fit p-0.5'>OVERGROW</li>
                      <li className='border rounded w-fit p-0.5'>
                        CHLOROPHYLL
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className='w-15 xl:w-22 text-right font-bold xl:px-3 py-3 leading-none whitespace-nowrap'>
                    Type
                  </td>
                  <td className='pl-3 xl:px-3 py-3 leading-none'>
                    <div className='flex gap-x-4'>
                      <div className='border rounded w-fit p-0.5'>
                        <span>Grass</span>
                        {/* Icono */}
                      </div>
                      <div className='border rounded w-fit p-0.5'>
                        <span>Poison</span>
                        {/* Icono */}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='w-15 xl:w-22 text-right font-bold xl:px-3 py-3 align-top leading-none whitespace-nowrap'>
                    Forms
                  </td>
                  <td className='pl-3 xl:px-3 py-3 align-top'>
                    <div className='flex flex-wrap gap-x-2 gap-y-2 leading-none'>
                      <span className='border rounded w-fit p-0.5'>
                        BULBASAUR
                      </span>
                      <span className='border rounded w-fit p-0.5'>
                        BULBASAURASDDD
                      </span>
                      <span className='border rounded w-fit p-0.5'>
                        BULBASAUR
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className='flex flex-1 max-w-full lg:max-w-2/5 justify-center'>
            <img
              src={spriteUrl}
              alt={pokemon.name}
              className='w-full h-auto object-contain'
            />
          </div>
          <div className='flex flex-1 w-100 lg:max-w-1/4 justify-center'>
            <div className='w-full lg:perspective-normal'>
              <table className='table-fixed text-[#505050] w-full transform lg:-rotate-y-30 lg:hover:rotate-y-0 transition-transform duration-300'>
                <thead>
                  <tr>
                    <th className='w-22 xl:w-28'></th>
                    <th className='text-center p-4'>
                      <button className='cursor-pointer'>Base</button>
                    </th>
                    <th className='text-center p-4'>
                      <button className='cursor-pointer'>Min</button>
                    </th>
                    <th className='text-center p-4'>
                      <button className='cursor-pointer'>Max</button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='text-right font-bold xl:px-3 py-3 leading-none whitespace-nowrap'>
                      HP
                    </td>
                    <td
                      colSpan={3}
                      className='w-full pl-3 xl:px-3 py-3'
                    >
                      <div className='w-full h-4 bg-gray-200 rounded overflow-hidden shadow-inner'>
                        <div className='flex items-center justify-end bg-[#81c784] h-full w-3/4 leading-none animate-stripes duration-400'>
                          <span className='pr-2 text-white'>45</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right font-bold xl:px-3 py-3 leading-none whitespace-nowrap'>
                      Attack
                    </td>
                    <td
                      colSpan={3}
                      className='w-full pl-3 xl:px-3 py-3'
                    >
                      <div className='w-full h-4 bg-gray-200 rounded overflow-hidden shadow-inner'>
                        <div className='flex items-center justify-end bg-[#81c784] h-full w-3/4 leading-none animate-stripes duration-400'>
                          <span className='pr-2 text-white'>45</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right font-bold xl:px-3 py-3 leading-none whitespace-nowrap'>
                      Defence
                    </td>
                    <td
                      colSpan={3}
                      className='w-full pl-3 xl:px-3 py-3'
                    >
                      <div className='w-full h-4 bg-gray-200 rounded overflow-hidden shadow-inner'>
                        <div className='flex items-center justify-end bg-[#81c784] h-full w-3/4 leading-none animate-stripes duration-400'>
                          <span className='pr-2 text-white'>45</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right font-bold xl:px-3 py-3 leading-none whitespace-nowrap'>
                      Sp. Attack
                    </td>
                    <td
                      colSpan={3}
                      className='w-full pl-3 xl:px-3 py-3'
                    >
                      <div className='w-full h-4 bg-gray-200 rounded overflow-hidden shadow-inner'>
                        <div className='flex items-center justify-end bg-[#81c784] h-full w-full leading-none animate-stripes duration-400'>
                          <span className='pr-2 text-white'>45</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right font-bold xl:px-3 py-3 leading-none whitespace-nowrap'>
                      Sp. Defence
                    </td>
                    <td
                      colSpan={3}
                      className='w-full pl-3 xl:px-3 py-3'
                    >
                      <div className='w-full h-4 bg-gray-200 rounded overflow-hidden shadow-inner'>
                        <div className='flex items-center justify-end bg-[#81c784] h-full w-full leading-none animate-stripes duration-400'>
                          <span className='pr-2 text-white'>45</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right font-bold xl:px-3 py-3 leading-none whitespace-nowrap'>
                      Speed
                    </td>
                    <td
                      colSpan={3}
                      className='w-full pl-3 xl:px-3 py-3'
                    >
                      <div className='w-full h-4 bg-gray-200 rounded overflow-hidden shadow-inner'>
                        <div className='flex items-center justify-end bg-[#81c784] h-full w-3/4 leading-none animate-stripes duration-400'>
                          <span className='pr-2 text-white'>45</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right font-bold xl:px-3 py-3 leading-none'>
                      Total
                    </td>
                    <td
                      colSpan={3}
                      className='pl-3 xl:px-3 py-3 leading-none'
                    >
                      3000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
