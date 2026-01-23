// Node modules
import { createFileRoute, useParams } from '@tanstack/react-router';

// Hooks
import { usePokemonDetail } from '@/hooks/usePokemon';

// Components
import { PokemonDetailHeader } from '@/components/PokemonDetailHeader';
import { PokemonStats } from '@/components/PokemonStats';
import { EvolutionChain } from '@/components/EvolutionChain';

// Constants
export const Route = createFileRoute('/pokemon/$id')({
  component: PokemonDetailComponent,
});

function PokemonDetailComponent() {
  const { id } = useParams({ from: '/pokemon/$id' });
  const { data, isLoading, error } = usePokemonDetail(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='min-h-screen bg-gradient-to-b from-green-400 to-white'>
      <PokemonDetailHeader />

      <div className='container mx-auto p-8'>
        {/* Nombre y categoría */}
        <h1 className='text-4xl font-bold text-center'>
          {data.name.toUpperCase()}
        </h1>

        <div className='grid grid-cols-3 gap-8 mt-8'>
          {/* Columna izquierda - Info básica */}
          <div>
            <p>ID: #{data.id}</p>
            <p>Height: {data.height}</p>
            {/* ... más info */}
          </div>

          {/* Centro - Imagen */}
          <div className='flex justify-center'>
            <img src={data.sprites.other['official-artwork'].front_default} />
          </div>

          {/* Columna derecha - Stats */}
          <div>
            <PokemonStats stats={data.stats} />
          </div>
        </div>

        <EvolutionChain />
      </div>
    </div>
  );
}
