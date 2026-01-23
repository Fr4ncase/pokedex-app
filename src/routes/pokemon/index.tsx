// Node modules
import { createFileRoute } from '@tanstack/react-router';

// Constants
export const Route = createFileRoute('/pokemon/')({
  component: PokemonGridComponent,
});

function PokemonGridComponent() {
  return <h2>Pokemon Grid</h2>;
}
