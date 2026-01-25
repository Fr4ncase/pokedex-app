// Node modules
import { Search } from 'lucide-react';

// Interfaces
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className='relative'>
      <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-search size-4 stroke-3' />
      <input
        type='text'
        placeholder='Search...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='bg-brand-gray rounded-full shadow-search-soft h-7 sm:h-10 pl-4 pr-12 text-pokedex-gray font-semibold focus:outline-none w-full'
      />
    </div>
  );
};
