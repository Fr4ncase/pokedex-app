interface Stat {
  base_stat: number;
  stat: { name: string };
}

interface PokemonStatsProps {
  stats: Stat[];
}

export const PokemonStats = ({ stats }: PokemonStatsProps) => {
  return (
    <div>
      {stats.map((stat) => (
        <div key={stat.stat.name}>
          <span>{stat.stat.name}</span>
          <div className='w-full bg-gray-200 rounded'>
            <div
              className='bg-green-500 h-4 rounded'
              style={{ width: `${(stat.base_stat / 255) * 100}%` }}
            />
          </div>
          <span>{stat.base_stat}</span>
        </div>
      ))}
    </div>
  );
};
