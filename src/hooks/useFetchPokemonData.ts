import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useFetchPokemonData = (page: number) => {
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

export default useFetchPokemonData;
