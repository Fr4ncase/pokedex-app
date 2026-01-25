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
      <Search className='absolute right-3 top-1/2 transform -translate-y-1/2' />
      <input
        type='text'
        placeholder='Search...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='bg-[#f6f6f6] rounded-[50rem] shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.075)] h-8 sm:h-10 pl-4 w-60 pr-12'
      />
    </div>
  );
};
