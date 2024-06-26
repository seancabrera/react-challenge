import { LinearProgress } from '@mui/material';
import PokemonPagination from 'components/table/PokemonPagination';
import PokemonDataTable from 'components/table/PokemonDataTable';
import useFetchPokemonData from 'hooks/useFetchPokemonData';

interface Props {
  page: number;
  onPokemonNameClick: Function;
  onPageNavigationClick: Function;
}

const PokemonList = ({
  page,
  onPokemonNameClick,
  onPageNavigationClick
}: Props) => {
  const { isPending, error, data: pokemonData } = useFetchPokemonData(page);

  if (isPending) return <LinearProgress style={{ marginTop: '15rem' }} />;
  if (error) return `An error has occurred: ${error.message}`;

  const pokemonList = pokemonData.results;
  const numPages = Math.ceil(pokemonData.count / 5);

  const columnDefinitions = [
    {
      headerName: 'Pokemon Name',
      field: 'name',
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
      <PokemonPagination
        page={page}
        pages={numPages}
        onPageNavigationClick={onPageNavigationClick}
      />
    </>
  );
};

export default PokemonList;
