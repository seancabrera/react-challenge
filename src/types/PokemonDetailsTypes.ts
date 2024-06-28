import NameUrlPair from './NameUrlPair';

export interface PokemonDetailsAbilities {
  ability: NameUrlPair;
}

export interface PokemonDetails {
  name: string;
  abilities: PokemonDetailsAbilities[];
}

export interface PokemonAbility {
  name: string;
  effect_entries: { effect: string; language: { name: string } }[];
}
