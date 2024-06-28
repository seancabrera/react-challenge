import FirstPageIcon from '@mui/icons-material/FirstPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useContext } from 'react';
import PageContext from 'contexts/PageContext';
import { IconButton } from '@mui/material';
import styles from './PokemonPagination.module.css';

interface Props {
  pages: number;
}

/**
 * This component provides a UI for pagination of the Pokemon data. Changes
 * made to the page are set on the PageContext for other components to consume.
 *
 * @param {number} pages The total number of pages
 * @returns {JSX.Element}
 */
const PokemonPagination = ({ pages }: Props): JSX.Element => {
  // Using a "Context" for the page allows all of the business logic for
  // setting the page to be contained within this component, which is cleaner
  // than calling a callbuck function further up the component tree
  const { page, setPage } = useContext(PageContext);

  const prevPageDisabled = page === 1;
  const nextPageDisabled = page === pages;

  function handlePageClick(newPage: number): void {
    // Check for boundaries. Call setPage if the newPage is valid.
    if (newPage < 1 || newPage > pages) {
      return;
    }

    setPage(newPage);
  }

  return (
    <div className={styles.paginationContainer}>
      <IconButton
        onClick={() => handlePageClick(1)}
        disabled={prevPageDisabled}
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={() => handlePageClick(page - 1)}
        disabled={prevPageDisabled}
      >
        <ChevronLeftIcon />
      </IconButton>
      Page {page} of {pages}
      <IconButton
        onClick={() => handlePageClick(page + 1)}
        disabled={nextPageDisabled}
      >
        <ChevronRightIcon />
      </IconButton>
      <IconButton
        onClick={() => handlePageClick(pages)}
        disabled={nextPageDisabled}
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
};

export default PokemonPagination;
