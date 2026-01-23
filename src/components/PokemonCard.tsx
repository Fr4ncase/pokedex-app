// Node modules
import { Link } from '@tanstack/react-router';

// Types
import type { PokemonListItem } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Link
      to='/pokemon/$id'
      params={{ id: pokemon.id.toString() }}
    >
      {/* Card con imagen, número, nombre y tipos */}
    </Link>
  );
};
