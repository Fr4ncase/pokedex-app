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
        <div className='flex flex-col md:flex-row justify-center items-center'>
          <div className='flex flex-1 max-w-full lg:max-w-1/4 justify-center'>
            <div className='w-full md:perspective-normal'>
              <table className='text-[#505050] w-full transform md:rotate-y-30 md:hover:rotate-y-0 transition-transform duration-300'>
                <tr>
                  <td className='text-right font-bold pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    ID
                  </td>
                  <td className='pl-3 pr-0 lg:px-3 py-3 leading-none'>#1</td>
                </tr>
                <tr>
                  <td className='text-right font-bold pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    Height
                  </td>
                  <td className='pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    0.7m ( 2'4" )
                  </td>
                </tr>
                <tr>
                  <td className='text-right font-bold pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    Weight
                  </td>
                  <td className='pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    6.9kg ( 15.2 lbs )
                  </td>
                </tr>
                <tr>
                  <td className='text-right font-bold pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    Abilities
                  </td>
                  <td className='pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    <ul className='flex gap-x-2'>
                      <li className='border rounded w-fit p-0.5'>OVERGROW</li>
                      <li className='border rounded w-fit p-0.5'>
                        CHLOROPHYLL
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className='text-right font-bold pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    Type
                  </td>
                  <td className='pl-3 pr-0 lg:px-3 py-3 leading-none'>
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
                  <td className='text-right font-bold pl-3 pr-0 lg:px-3 py-3 align-top leading-none'>
                    Forms
                  </td>
                  <td className='px-3 py-3 align-top'>
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
          <div className='flex flex-1 max-w-full lg:max-w-1/4 justify-center'>
            {/*  flex flex-1 max-w-full lg:max-w-1/4 justify-center  */}
            <div className='w-full md:perspective-normal'>
              <table className='text-[#505050] w-full transform md:-rotate-y-30 md:hover:rotate-y-0 transition-transform duration-300'>
                <tr>
                  <td></td>
                  <td>
                    <button className='cursor-pointer'>Base</button>
                  </td>
                  <td>
                    <button className='cursor-pointer'>Min</button>
                  </td>
                  <td>
                    <button className='cursor-pointer'>Max</button>
                  </td>
                </tr>
                <tr>
                  <td className='text-right font-bold pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    HP
                  </td>
                  <td
                    colSpan={3}
                    className='pl-3 pr-0 lg:px-3 py-3'
                  >
                    <div className='w-full h-4 bg-gray-200 rounded-lg overflow-hidden'>
                      <div className='bg-green-400 h-full w-3/4 text-end leading-none'>
                        <span className='pr-1'>45</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='text-right font-bold pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    Attack
                  </td>
                  <td>
                    <div>
                      <div>
                        <span></span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='text-right font-bold pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    Defence
                  </td>
                  <td>
                    <div>
                      <div>
                        <span></span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='text-right font-bold pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    Sp. Attack
                  </td>
                  <td>
                    <div>
                      <div>
                        <span></span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='text-right font-bold pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    Sp. Defence
                  </td>
                  <td>
                    <div>
                      <div>
                        <span></span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='text-right font-bold pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    Speed
                  </td>
                  <td>
                    <div>
                      <div>
                        <span></span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='text-right font-bold pl-3 pr-0 lg:px-3 py-3 leading-none'>
                    Total
                  </td>
                  <td className='pl-3 pr-0 lg:px-3 py-3 leading-none'>3000</td>
                </tr>
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
