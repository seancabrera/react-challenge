import { useMemo, useState } from 'react';

const usePageContextProvider = () => {
  const [page, setPage] = useState(1);

  return useMemo(() => ({ page, setPage }), [page, setPage]);
};

export default usePageContextProvider;
