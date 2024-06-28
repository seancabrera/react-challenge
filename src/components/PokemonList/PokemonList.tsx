import { LinearProgress } from '@mui/material';
import PokemonPagination from 'components/PokemonPagination/PokemonPagination';
import PokemonDataTable from 'components/PokemonDataTable/PokemonDataTable';
import useFetchPokemonList from 'hooks/useFetchPokemonList';
import { useContext } from 'react';
import PageContext from 'contexts/PageContext';
import NameUrlPair from 'types/NameUrlPair';
import { useNavigate } from 'react-router-dom';

/**
 * Renders a list of Pokemon and allows the user to navigate through all of the
 * Pokemon using pagination. Clicking on a pokemon will navigate to its
 * PokemonDetails view.
 *
 * @returns {JSX.Element}
 */
const PokemonList = () => {
  const { page } = useContext(PageContext);
  const { isPending, error, data: pokemonData } = useFetchPokemonList(page);
  const navigate = useNavigate();

  if (isPending) return <LinearProgress style={{ marginTop: '15rem' }} />;
  if (error) return `An error has occurred: ${error.message}`;

  const pokemonList = pokemonData.results;
  const numPages = Math.ceil(pokemonData.count / 5);

  const columnDefinitions = [
    {
      headerName: 'Pokemon Name',
      field: 'name',
      css: {
        textTransform: 'capitalize'
      },
      isKeyField: true
    }
  ];

  const handlePokemonNameClick = (selectedPokemon: NameUrlPair) => {
    navigate('/details', { state: { selectedPokemon } });
  };

  return (
    <>
      <PokemonDataTable
        columnDefinitions={columnDefinitions}
        rowData={pokemonList}
        onRowClick={handlePokemonNameClick}
      />
      <PokemonPagination pages={numPages} />
    </>
  );
};

export default PokemonList;
