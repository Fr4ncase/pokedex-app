// Node modules
import axios from 'axios';

// Constants
export const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});
