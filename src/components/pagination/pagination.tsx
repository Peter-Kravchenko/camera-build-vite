import cn from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setCurrentPage } from '../../store/app-process/app-process.slice';
import { useAppDispatch } from '../../hooks/index';
import { AppRoute, MAX_CAMERAS_ON_PAGE } from '../../const';
import { createPages } from '../../utils/utils';
import { TCameras } from '../../types/cameras';
import { useEffect } from 'react';

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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    const parsedPage = pageParam ? Number(pageParam) : 1;
    const isValid =
      !isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages;

    if (parsedPage !== currentPage) {
      if (isValid) {
        dispatch(setCurrentPage(parsedPage));
      } else {
        navigate(AppRoute.NotFound);
      }
    }
  }, [currentPage, dispatch, location, navigate, totalPages]);

  return (
    <div className="pagination" style={{ cursor: 'pointer' }}>
      <ul className="pagination__list">
        {currentPage > 1 && (
          <li className="pagination__item">
            <Link
              to={`${AppRoute.Catalog}?page=${currentPage - 1}`}
              className="pagination__link pagination__link--text"
              onClick={() => {
                dispatch(setCurrentPage(currentPage - 1));
              }}
            >
              Назад
            </Link>
          </li>
        )}
        {pages.map((page) => (
          <li
            key={page}
            className="pagination__item"
            onClick={() => {
              dispatch(setCurrentPage(page));
            }}
          >
            <Link
              to={`${AppRoute.Catalog}?page=${page}`}
              className={cn('pagination__link', {
                'pagination__link--active': currentPage === page,
              })}
            >
              {page}
            </Link>
          </li>
        ))}
        {currentPage < totalPages ? (
          <li className="pagination__item">
            <Link
              to={`${AppRoute.Catalog}?page=${currentPage + 1}`}
              className="pagination__link pagination__link--text"
              onClick={() => {
                dispatch(setCurrentPage(currentPage + 1));
              }}
            >
              Далее
            </Link>
          </li>
        ) : (
          <div style={{ paddingLeft: '99px' }}></div>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
