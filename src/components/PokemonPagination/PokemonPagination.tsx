import FirstPageIcon from '@mui/icons-material/FirstPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import styles from './PokemonPagination.module.css';

interface Props {
  page: number;
  pages: number;
  onPageNavigationClick: Function;
}

const PokemonPagination = ({ page, pages, onPageNavigationClick }: Props) => {
  function handlePageClick(newPage: number): void {
    // Check for boundaries. Call onPageNavigationClick if the newPage is valid.
    if (newPage < 1 || newPage > pages) {
      return;
    }

    onPageNavigationClick(newPage);
  }

  const prevPageDisabled = page === 1;
  const nextPageDisabled = page === pages;

  const prevIconsEnabledOrDisabledClass = prevPageDisabled
    ? styles.paginationIconDisabled
    : styles.paginationIconEnabled;
  const nextIconsEnabledOrDisabledClass = nextPageDisabled
    ? styles.paginationIconDisabled
    : styles.paginationIconEnabled;

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
