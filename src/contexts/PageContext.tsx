import { createContext } from 'react';

interface PageContextType {
  page: number;
  setPage: Function;
}

const PageContext = createContext<PageContextType>({
  page: 1,
  setPage: () => {}
});
export default PageContext;
