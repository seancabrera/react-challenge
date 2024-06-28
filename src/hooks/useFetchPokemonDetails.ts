import { useQueries, useQuery } from '@tanstack/react-query';
import NameUrlPair from 'types/NameUrlPair';
import {
  PokemonAbility,
  PokemonDetails,
  PokemonDetailsAbilities
} from 'types/PokemonDetailsTypes';

/**
 * Custom hook for fetching details about a selected Pokemon. This hook returns
 * the selected pokemon's name and a list of abilities including ability effects.
 *
 * @param {NameUrlPair} selectedPokemon  The name and url for the selected pokemon
 * @returns {Object} An object containing the name and abilities for the selected
 * pokemon and query statuses (isPending, isError)
 */
const useFetchPokemonDetails = (selectedPokemon: NameUrlPair) => {
  const {
    isPending: isBaseDetailsPending,
    error: isBaseDetailsError,
    data: pokemonBaseDetails
  } = useQuery({
    queryKey: ['pokemonDetails', selectedPokemon.url],
    queryFn: (): Promise<PokemonDetails> =>
      fetch(selectedPokemon.url).then((response) => response.json())
  });

  // The base pokemon details query above provides an array of abilities with
  // just the name and url. To add the ability effect, we must perform additional
  // queries for each ability.url to get the full ability and combine the results
  const abilitiesQueries = useQueries({
    queries: pokemonBaseDetails
      ? pokemonBaseDetails.abilities.map((ability: PokemonDetailsAbilities) => {
          return {
            queryKey: ['ability', ability.ability.name],
            queryFn: (): Promise<PokemonAbility> =>
              fetch(ability.ability.url).then((response) => response.json())
          };
        })
      : []
  });

  function getMatchingAbilityEffect(ability: string): string {
    const matchingAbilityEffect = abilitiesQueries
      ?.find((abilityQuery) => abilityQuery.data?.name === ability)
      ?.data?.effect_entries?.find(
        (effectEntry) => effectEntry.language.name === 'en'
      );

    return matchingAbilityEffect ? matchingAbilityEffect.effect : '';
  }

  // Combine the isPending and isError statuses of all the queries
  const isPending =
    isBaseDetailsPending ||
    abilitiesQueries.some((abilityQuery) => abilityQuery.isPending);
  const isError =
    isBaseDetailsError ||
    abilitiesQueries.some((abilityQuery) => abilityQuery.isError);

  const abilities = pokemonBaseDetails?.abilities.map((ability: any) => {
    return {
      ability: ability.ability.name,
      abilityEffect: getMatchingAbilityEffect(ability.ability.name)
    };
  });

  const data = {
    name: selectedPokemon.name,
    abilities
  };

  return { isPending, isError, data };
};

export default useFetchPokemonDetails;
