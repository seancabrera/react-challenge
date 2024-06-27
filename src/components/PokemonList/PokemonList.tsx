import { LinearProgress } from '@mui/material';
import PokemonPagination from 'components/PokemonPagination/PokemonPagination';
import PokemonDataTable from 'components/PokemonDataTable/PokemonDataTable';
import useFetchPokemonData from 'hooks/useFetchPokemonData';
import { useContext } from 'react';
import PageContext from 'contexts/PageContext';

interface Props {
  onPokemonNameClick: Function;
}

const PokemonList = ({ onPokemonNameClick }: Props) => {
  const { page } = useContext(PageContext);
  const { isPending, error, data: pokemonData } = useFetchPokemonData(page);

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

  return (
    <>
      <PokemonDataTable
        columnDefinitions={columnDefinitions}
        rowData={pokemonList}
        onRowClick={onPokemonNameClick}
      />
      <PokemonPagination pages={numPages} />
    </>
  );
};

export default PokemonList;
