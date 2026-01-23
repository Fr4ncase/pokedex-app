// Node modules
import { createFileRoute, useParams } from '@tanstack/react-router';

// Constants
export const Route = createFileRoute('/pokemon/$id')({
  component: PokemonDetailComponent,
});

function PokemonDetailComponent() {
  const { id } = useParams({ from: '/pokemon/$id' });

  return <h2>Pokemon Detail: {id}</h2>;
}
