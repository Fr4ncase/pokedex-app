// Node modules
import { useNavigate } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';

export const PokemonDetailHeader = () => {
  const navigate = useNavigate();

  return (
    <header className='...'>
      <button onClick={() => navigate({ to: '/pokemon' })}>
        <ChevronLeft />
      </button>
      <h1>PokéDex</h1>
    </header>
  );
};
