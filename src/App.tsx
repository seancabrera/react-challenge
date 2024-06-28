import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonList from 'components/PokemonList/PokemonList';
import PokemonDetails from 'components/PokemonDetails/PokemonDetails';
import PageContext from 'contexts/PageContext';
import usePageContextProvider from 'hooks/usePageContextProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

const App = (): React.ReactNode => {
  const pageContextProvider = usePageContextProvider();

  return (
    <QueryClientProvider client={queryClient}>
      <PageContext.Provider value={pageContextProvider}>
        <div className='app-container'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PokemonList />} />
              <Route path='details' element={<PokemonDetails />} />
            </Routes>
          </BrowserRouter>
        </div>
      </PageContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
