import { createContext } from 'react';

interface PageContextType {
  page: number;
  setPage: Function;
}

/**
 * Context holding the page state and setPage function.
 * @type {React.Context<PageContextType>}
 */
const PageContext = createContext<PageContextType>({
  page: 1,
  setPage: () => {}
});
export default PageContext;
