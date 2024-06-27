import { LinearProgress, Link } from '@mui/material';
import PokemonDataTable from 'components/PokemonDataTable/PokemonDataTable';
import useFetchPokemonDetails from 'hooks/useFetchPokemonDetails';
import NameUrlPair from 'types/NameUrlPair';
import styles from './PokemonDetails.module.css';

interface Props {
  selectedPokemon: NameUrlPair;
  onBackToListClick: Function;
}

const PokemonDetails = ({ selectedPokemon, onBackToListClick }: Props) => {
  const {
    isPending,
    isError,
    data: pokemonDetails
  } = useFetchPokemonDetails(selectedPokemon);

  if (isPending) return <LinearProgress style={{ marginTop: '15rem' }} />;
  if (isError) return 'An error has occurred.';

  const columnDefinitions = [
    {
      headerName: 'Ability',
      field: 'ability',
      isKeyField: true,
      css: {
        textTransform: 'capitalize'
      }
    },
    {
      headerName: 'Ability Effect',
      field: 'abilityEffect'
    }
  ];

  return (
    <>
      <h1 className={styles.pokemonDetailsHeader}>
        Selected Pokemon: {pokemonDetails.name}
      </h1>
      <PokemonDataTable
        columnDefinitions={columnDefinitions}
        rowData={pokemonDetails?.abilities ?? []}
      />

      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link
        className={styles.backToListLink}
        href='#'
        underline='hover'
        variant='body2'
        onClick={() => onBackToListClick()}
      >
        Back to list view
      </Link>
    </>
  );
};

export default PokemonDetails;
