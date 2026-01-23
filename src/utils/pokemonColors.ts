export const typeColors: Record<string, string> = {
  normal: 'bg-stone-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-400',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-sky-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-600',
  rock: 'bg-yellow-700',
  ghost: 'bg-indigo-700',
  dragon: 'bg-violet-600',
  dark: 'bg-stone-800',
  steel: 'bg-zinc-500',
  fairy: 'bg-pink-300',
};

export const getTypeColor = (type: string) => {
  return typeColors[type] || 'bg-gray-500';
};
