export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
  stats?: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  height?: number;
  weight?: number;
}

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
