// Node modules
import axios from 'axios';

// Constans
export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000,
});

// Types
export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export const LIMIT = 20;

export async function fetchPokemonPage(offset = 0): Promise<PokemonResponse> {
  const res = await api.get('pokemon', { params: { limit: LIMIT, offset } });
  return res.data;
}

export async function fetchPokemonDetail(nameOrId: string | number) {
  const res = await api.get(`pokemon/${nameOrId}`);
  return res.data;
}
