import { keepPreviousData, useQuery } from '@tanstack/react-query';

/**
 * Custom hook for fetching a list of pokemon
 *
 * @param {number} page  The page number for the Pokemon list
 * @returns {Object} An object containing a list of pokemon
 * and various query statuses (isPending, error)
 */
const useFetchPokemonList = (page: number) => {
  return useQuery({
    queryKey: ['pokemonList', page],
    queryFn: () =>
      fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 5}&limit=5`
      )
        .then((response) => response.json())
        .then((data) => data),
    placeholderData: keepPreviousData
  });
};

export default useFetchPokemonList;
