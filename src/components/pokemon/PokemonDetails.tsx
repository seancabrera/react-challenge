import { LinearProgress, Link } from '@mui/material';
import PokemonDataTable from 'components/table/PokemonDataTable';
import useFetchPokemonDetails from 'hooks/useFetchPokemonDetails';
import NameUrlPair from 'types/NameUrlPair';

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
      isKeyField: true
    },
    {
      headerName: 'Ability Effect',
      field: 'abilityEffect'
    }
  ];

  return (
    <>
      <h1 className='pokemon-details-header'>
        Selected Pokemon: {pokemonDetails.name}
      </h1>
      <PokemonDataTable
        columnDefinitions={columnDefinitions}
        rowData={pokemonDetails?.abilities ?? []}
      />

      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link
        className='back-to-list-link'
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
