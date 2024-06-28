import { LinearProgress } from '@mui/material';
import PokemonDataTable from 'components/PokemonDataTable/PokemonDataTable';
import useFetchPokemonDetails from 'hooks/useFetchPokemonDetails';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './PokemonDetails.module.css';

/**
 * Displays the details of a selected pokemon, including its name and a list
 * of abilities with the ability name and effect
 *
 * @returns {JSX.Element}
 */
const PokemonDetails = () => {
  const { selectedPokemon } = useLocation().state ?? {};
  const navigate = useNavigate();

  // If the user entered the url for the details view instead of navigating to
  // it from the landing page, we won't have a selected pokemon. In that case,
  // redirect back to the landing page.
  useEffect(() => {
    if (!selectedPokemon) {
      navigate('/');
    }
  });

  const {
    isPending,
    isError,
    data: pokemonDetails
  } = useFetchPokemonDetails(selectedPokemon);

  if (isPending) return <LinearProgress style={{ marginTop: '15rem' }} />;
  if (isError) return 'An error has occurred.';
  if (!pokemonDetails) return ''; // This should redirect

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
        Selected Pokemon: {pokemonDetails?.name}
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
