import { useMemo, useState } from 'react';

/**
 * Custom hook for PageContext provider
 */
const usePageContextProvider = () => {
  const [page, setPage] = useState(1);

  return useMemo(() => ({ page, setPage }), [page, setPage]);
};

export default usePageContextProvider;
