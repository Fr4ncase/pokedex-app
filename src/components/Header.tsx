// Node modules
import { Link, useLocation } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

// Components
import { SearchBar } from '@/components/SearchBar';

// Interfaces
interface PokedexHeaderProps {
  speciesColorHex?: string;
  textColorHex?: string;
  search?: string;
  onSearchChange?: (value: string) => void;
}

export const Header = ({
  speciesColorHex,
  textColorHex,
  search = '',
  onSearchChange = () => {},
}: PokedexHeaderProps) => {
  const location = useLocation();
  const isIndex = location.pathname === '/pokemon';

  return (
    <header
      className='bg-white w-full h-10 sm:h-16 shadow-header-glow'
      style={{ backgroundColor: speciesColorHex }}
    >
      <nav className='flex items-center h-full px-8 py-2'>
        <div className='flex-1 flex justify-start'>
          {isIndex ? (
            <SearchBar
              value={search}
              onChange={onSearchChange}
            />
          ) : (
            <Link to='/pokemon'>
              <ArrowLeft
                className='text-pokedex-gray'
                style={{ color: textColorHex }}
              />
            </Link>
          )}
        </div>
        <div className='flex-1 flex justify-end'>
          <h1
            className='text-2xl sm:text-4xl text-pokedex-gray'
            style={{ color: textColorHex }}
          >
            PokéDex
          </h1>
        </div>
      </nav>
    </header>
  );
};
