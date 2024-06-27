import { LinearProgress } from '@mui/material';
import PokemonDataTable from 'components/PokemonDataTable/PokemonDataTable';
import useFetchPokemonDetails from 'hooks/useFetchPokemonDetails';
import { Link, useLocation } from 'react-router-dom';
import styles from './PokemonDetails.module.css';

const PokemonDetails = () => {
  const { selectedPokemon } = useLocation().state;

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

      <Link className={styles.backToListLink} to='/'>
        Back to list view
      </Link>
    </>
  );
};

export default PokemonDetails;
