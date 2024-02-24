import cn from 'classnames';
import { TCameras } from '../../types/cameras';
import usePagination from '../../hooks/use-pagination';
import usePageNavigation from '../../hooks/use-page-navigation';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type PaginationProps = {
  cameras: TCameras;
  currentPage: number;
};

function Pagination({ cameras, currentPage }: PaginationProps): JSX.Element {
  const navigate = useNavigate();

  const {
    totalPages,
    currentIteration,
    totalIterations,
    firstPage,
    lastPage,
    pages,
  } = usePagination(cameras, currentPage);

  const handleBackButtonClick = () => {
    const prevPage = firstPage - 1;
    navigate({ pathname: AppRoute.Catalog, search: `?page=${prevPage}` });
  };

  const handlePageButtonClick = (page: number) => {
    navigate({ pathname: AppRoute.Catalog, search: `?page=${page}` });
  };

  const handleForwardButtonClick = () => {
    const nextPage = lastPage + 1;
    navigate({ pathname: AppRoute.Catalog, search: `page=${nextPage}` });
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
