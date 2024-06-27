import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonList from 'components/PokemonList/PokemonList';
import PokemonDetails from 'components/PokemonDetails/PokemonDetails';
import { useMemo, useState } from 'react';
import NameUrlPair from 'types/NameUrlPair';
import PageContext from 'contexts/PageContext';

const queryClient = new QueryClient();

const App = (): React.ReactNode => {
  const [selectedPokemon, setSelectedPokemon] = useState<NameUrlPair | null>(
    null
  );
  const [page, setPage] = useState(1);
  const pageContextProvider = useMemo(
    () => ({ page, setPage }),
    [page, setPage]
  );

  const handlePokemonNameClick = (pokemon: NameUrlPair) => {
    setSelectedPokemon(pokemon);
  };

  const handleBackToListClick = () => {
    setSelectedPokemon(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PageContext.Provider value={pageContextProvider}>
        <div className='app-container'>
          {!selectedPokemon ? (
            <PokemonList onPokemonNameClick={handlePokemonNameClick} />
          ) : (
            <PokemonDetails
              selectedPokemon={selectedPokemon}
              onBackToListClick={handleBackToListClick}
            />
          )}
        </div>
      </PageContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
