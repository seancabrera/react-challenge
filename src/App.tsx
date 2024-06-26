import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonList from 'components/pokemon/PokemonList';
import PokemonDetails from 'components/pokemon/PokemonDetails';
import { useState } from 'react';
import NameUrlPair from 'types/NameUrlPair';

const queryClient = new QueryClient();

const App = (): React.ReactNode => {
  const [selectedPokemon, setSelectedPokemon] = useState<NameUrlPair | null>(null);
  const [page, setPage] = useState(1);

  const handlePokemonNameClick = (pokemon: NameUrlPair) => {
    setSelectedPokemon(pokemon);
  };

  const handleBackToListClick = () => {
    setSelectedPokemon(null);
  };

  const handlePageNavigationClick = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className='app-container'>
        {!selectedPokemon ? (
          <PokemonList
            page={page}
            onPokemonNameClick={handlePokemonNameClick}
            onPageNavigationClick={handlePageNavigationClick}
          />
        ) : (
          <PokemonDetails
            selectedPokemon={selectedPokemon}
            onBackToListClick={handleBackToListClick}
          />
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;
