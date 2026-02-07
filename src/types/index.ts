export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

export interface PokemonStatEntry {
  base_stat: number;
  stat: { name: string };
}

export type PokemonDetailView = Pokemon & {
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  forms: { name: string }[];
  stats: PokemonStatEntry[];
};

export type TypeName =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';
