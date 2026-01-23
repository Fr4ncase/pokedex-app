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
      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2' />
      <input
        type='text'
        placeholder='Search...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='pl-10 pr-4 py-2 ...'
      />
    </div>
  );
};
