import FirstPageIcon from '@mui/icons-material/FirstPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LastPageIcon from '@mui/icons-material/LastPage';

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
    ? 'pagination-icon-disabled'
    : 'pagination-icon-enabled';
  const nextIconsEnabledOrDisabledClass = nextPageDisabled
    ? 'pagination-icon-disabled'
    : 'pagination-icon-enabled';

  return (
    <div className='pagination-container'>
      <FirstPageIcon
        className={`pagination-icon first-page-icon ${prevIconsEnabledOrDisabledClass}`}
        onClick={() => handlePageClick(1)}
        color={page === 1 ? 'disabled' : 'inherit'}
      />
      <ChevronLeftIcon
        className={`pagination-icon prev-page-icon ${prevIconsEnabledOrDisabledClass}`}
        onClick={() => handlePageClick(page - 1)}
        color={page === 1 ? 'disabled' : 'inherit'}
      />
      Page {page} of {pages}
      <ChevronRightIcon
        className={`pagination-icon next-page-icon ${nextIconsEnabledOrDisabledClass}`}
        onClick={() => handlePageClick(page + 1)}
        color={page === pages ? 'disabled' : 'inherit'}
      />
      <LastPageIcon
        className={`pagination-icon last-page-icon ${nextIconsEnabledOrDisabledClass}`}
        onClick={() => handlePageClick(pages)}
        color={page === pages ? 'disabled' : 'inherit'}
      />
    </div>
  );
};

export default PokemonPagination;
