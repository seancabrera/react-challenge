import { LinearProgress } from '@mui/material';
import PokemonPagination from 'components/PokemonPagination/PokemonPagination';
import PokemonDataTable from 'components/PokemonDataTable/PokemonDataTable';
import useFetchPokemonData from 'hooks/useFetchPokemonData';
import { useContext } from 'react';
import PageContext from 'contexts/PageContext';
import NameUrlPair from 'types/NameUrlPair';
import { useNavigate } from 'react-router-dom';

const PokemonList = () => {
  const { page } = useContext(PageContext);
  const { isPending, error, data: pokemonData } = useFetchPokemonData(page);
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
