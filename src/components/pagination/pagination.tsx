import cn from 'classnames';
import { TCameras } from '../../types/cameras';
import { useAppDispatch } from '../../hooks/index';
import { setCurrentPage } from '../../store/app-process/app-process.slice';
import { MAX_CAMERAS_ON_PAGE } from '../../const';
import { createPages } from '../../utils';

type PaginationProps = {
  cameras: TCameras;
  currentPage: number;
};

function Pagination({ cameras, currentPage }: PaginationProps): JSX.Element {
  const dispatch = useAppDispatch();

  const totalPages = Math.ceil(cameras.length / MAX_CAMERAS_ON_PAGE);
  const pages: number[] = [];
  createPages(pages, totalPages, currentPage);

  return (
    <div className="pagination" style={{ cursor: 'pointer' }}>
      <ul className="pagination__list">
        {currentPage > 1 && (
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link--text"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              Назад
            </a>
          </li>
        )}
        {pages.map((page) => (
          <li
            key={page}
            className="pagination__item"
            onClick={() => dispatch(setCurrentPage(page))}
          >
            <a
              className={cn('pagination__link', {
                'pagination__link--active': currentPage === page,
              })}
            >
              {page}
            </a>
          </li>
        ))}
        {currentPage < totalPages ? (
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link--text"
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              Далее
            </a>
          </li>
        ) : (
          <div style={{ paddingLeft: '99px' }}></div>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
