// Types
import type { TypeName } from '@/types';

export const typeColors: Record<TypeName, string> = {
  grass: '#63BB5B',
  fire: '#FF9C54',
  water: '#4D90D5',
  bug: '#90C12C',
  normal: '#9099A1',
  poison: '#AB6AC8',
  electric: '#F3D23B',
  ground: '#D97746',
  fairy: '#EC8FE6',
  fighting: '#CE4069',
  psychic: '#F97176',
  rock: '#C7B78B',
  ghost: '#5269AC',
  ice: '#74CEC0',
  dragon: '#096DC4',
  dark: '#5A5366',
  steel: '#5A8EA1',
  flying: '#92AADE',
};

export const speciesColors: Record<string, string> = {
  black: '#607d8b',
  blue: '#3aaee4',
  brown: '#a69791',
  gray: '#949393',
  green: '#68c96d',
  pink: '#f8bbd0',
  purple: '#ad8ee7',
  red: '#ff8a80',
  white: '#d5dbe1',
  yellow: '#ffd600',
};

export function getSpeciesColorHex(speciesColor?: string) {
  if (!speciesColor) return speciesColors.gray;

  return speciesColors[speciesColor.toLowerCase()];
}

const DARK_TEXT = 'text-text-body';
const LIGHT_TEXT = '#ffffff';

export const getTextColorHex = (speciesColor?: string) => {
  return speciesColor?.toLowerCase() === 'white' ? DARK_TEXT : LIGHT_TEXT;
};
