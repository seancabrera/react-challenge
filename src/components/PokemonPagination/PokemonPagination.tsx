import FirstPageIcon from '@mui/icons-material/FirstPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useContext } from 'react';
import PageContext from 'contexts/PageContext';
import styles from './PokemonPagination.module.css';

interface Props {
  pages: number;
}

const PokemonPagination = ({ pages }: Props) => {
  // Using a "Context" for the page allows all of the business logic for
  // setting the page to be contained within this component, which is cleaner
  // than calling a callbuck function further up the component tree
  const { page, setPage } = useContext(PageContext);

  const prevPageDisabled = page === 1;
  const nextPageDisabled = page === pages;

  const prevIconsEnabledOrDisabledClass = prevPageDisabled
    ? styles.paginationIconDisabled
    : styles.paginationIconEnabled;
  const nextIconsEnabledOrDisabledClass = nextPageDisabled
    ? styles.paginationIconDisabled
    : styles.paginationIconEnabled;

  function handlePageClick(newPage: number): void {
    // Check for boundaries. Call setPage if the newPage is valid.
    if (newPage < 1 || newPage > pages) {
      return;
    }

    setPage(newPage);
  }

  return (
    <div className={styles.paginationContainer}>
      <FirstPageIcon
        className={`${styles.paginationIcon} first-page-icon ${prevIconsEnabledOrDisabledClass}`}
        onClick={() => handlePageClick(1)}
        color={page === 1 ? 'disabled' : 'inherit'}
      />
      <ChevronLeftIcon
        className={`${styles.paginationIcon} prev-page-icon ${prevIconsEnabledOrDisabledClass}`}
        onClick={() => handlePageClick(page - 1)}
        color={page === 1 ? 'disabled' : 'inherit'}
      />
      Page {page} of {pages}
      <ChevronRightIcon
        className={`${styles.paginationIcon} next-page-icon ${nextIconsEnabledOrDisabledClass}`}
        onClick={() => handlePageClick(page + 1)}
        color={page === pages ? 'disabled' : 'inherit'}
      />
      <LastPageIcon
        className={`${styles.paginationIcon} last-page-icon ${nextIconsEnabledOrDisabledClass}`}
        onClick={() => handlePageClick(pages)}
        color={page === pages ? 'disabled' : 'inherit'}
      />
    </div>
  );
};

export default PokemonPagination;
