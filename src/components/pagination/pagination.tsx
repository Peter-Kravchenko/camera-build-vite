import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCurrentPage } from '../../store/app-process/app-process.slice';
import { useAppDispatch } from '../../hooks/index';
import { AppRoute, MAX_CAMERAS_ON_PAGE } from '../../const';
import { createPages } from '../../utils/utils';
import { TCameras } from '../../types/cameras';
import { useCallback, useEffect } from 'react';

type PaginationProps = {
  cameras: TCameras;
  currentPage: number;
};

function Pagination({ cameras, currentPage }: PaginationProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const totalPages = Math.ceil(cameras.length / MAX_CAMERAS_ON_PAGE);
  const pages: number[] = [];
  createPages(pages, totalPages, currentPage);

  const handleBackButtonClick = useCallback(() => {
    const prevPage = currentPage - 2;
    if (prevPage >= 1) {
      navigate(`${AppRoute.Catalog}?page=${prevPage}`);
    }
  }, [currentPage, navigate]);

  const handlePageButtonClick = useCallback(
    (page: number) => {
      navigate(`${AppRoute.Catalog}?page=${page}`);
    },
    [navigate]
  );

  const handleForwardButtonClick = useCallback(() => {
    const nextPage = currentPage + 2;
    if (currentPage === 1) {
      navigate(`${AppRoute.Catalog}?page=${nextPage + 1}`);
    } else {
      navigate(`${AppRoute.Catalog}?page=${nextPage}`);
    }
  }, [currentPage, navigate]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    const parsedPage = pageParam ? Number(pageParam) : 1;
    const isValidPage =
      !isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages;

    if (parsedPage !== currentPage) {
      if (isValidPage) {
        dispatch(setCurrentPage(parsedPage));
      } else {
        navigate(AppRoute.NotFound);
      }
    }
  }, [currentPage, dispatch, location, navigate, totalPages]);

  return (
    <div
      className="pagination"
      data-testid="pagination"
      style={{ cursor: 'pointer' }}
    >
      <ul className="pagination__list">
        {currentPage > 2 && (
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
        {currentPage < totalPages - 1 && (
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
