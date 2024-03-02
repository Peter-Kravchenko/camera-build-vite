import cn from 'classnames';
import { TCameras } from '../../types/cameras';
import usePagination from '../../hooks/use-pagination';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setCurrentPage } from '../../store/app-process/app-process.slice';
import usePageNavigation from '../../hooks/use-page-navigation';

type PaginationProps = {
  cameras: TCameras;
  currentPage: number;
};

function Pagination({ cameras, currentPage }: PaginationProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    currentIteration,
    totalIterations,
    totalPages,
    firstPage,
    lastPage,
    pages,
  } = usePagination(cameras, currentPage);

  const handleBackButtonClick = () => {
    const prevPage = firstPage - 1;
    dispatch(setCurrentPage(prevPage));
    searchParams.set('page', String(prevPage));
    setSearchParams(searchParams);
  };

  const handlePageButtonClick = (page: number) => {
    dispatch(setCurrentPage(page));
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  };

  const handleForwardButtonClick = () => {
    const nextPage = lastPage + 1;
    dispatch(setCurrentPage(nextPage));
    searchParams.set('page', String(nextPage));
    setSearchParams(searchParams);
  };

  usePageNavigation(totalPages, currentPage);

  return (
    <div
      className="pagination"
      data-testid="pagination"
      style={{ cursor: 'pointer' }}
    >
      <ul className="pagination__list">
        {currentIteration > 1 && (
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link--text"
              onClick={handleBackButtonClick}
            >
              Назад
            </a>
          </li>
        )}
        {pages.map((page) => (
          <li key={page} className="pagination__item">
            <a
              onClick={() => handlePageButtonClick(page)}
              className={cn('pagination__link', {
                'pagination__link--active': currentPage === page,
              })}
            >
              {page}
            </a>
          </li>
        ))}
        {currentIteration < totalIterations && (
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link--text"
              onClick={handleForwardButtonClick}
            >
              Далее
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
