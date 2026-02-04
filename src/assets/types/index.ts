// Custom modules
import bug from '@/assets/types/bug.svg';
import dark from '@/assets/types/dark.svg';
import dragon from '@/assets/types/dragon.svg';
import electric from '@/assets/types/electric.svg';
import fairy from '@/assets/types/fairy.svg';
import fighting from '@/assets/types/fighting.svg';
import fire from '@/assets/types/fire.svg';
import flying from '@/assets/types/flying.svg';
import ghost from '@/assets/types/ghost.svg';
import grass from '@/assets/types/grass.svg';
import ground from '@/assets/types/ground.svg';
import ice from '@/assets/types/ice.svg';
import normal from '@/assets/types/normal.svg';
import poison from '@/assets/types/poison.svg';
import psychic from '@/assets/types/psychic.svg';
import rock from '@/assets/types/rock.svg';
import steel from '@/assets/types/steel.svg';
import water from '@/assets/types/water.svg';

// Types
import type { TypeName } from '@/types';

export const typeIcons: Record<TypeName, string> = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
};

export const typeColors: Record<TypeName, string> = {
  grass: '#78C850',
  fire: '#F08030',
  water: '#6890F0',
  bug: '#A8B820',
  normal: '#A8A878',
  poison: '#A040A0',
  electric: '#F8D030',
  ground: '#E0C068',
  fairy: '#EE99AC',
  fighting: '#C03028',
  psychic: '#F85888',
  rock: '#B8A038',
  ghost: '#705898',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  flying: '#A890F0',
};