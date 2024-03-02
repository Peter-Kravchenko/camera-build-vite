import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SortType, SortOrder } from '../../const';
import { useAppDispatch } from '../../hooks';
import {
  setSortByType,
  setSortOrder,
} from '../../store/app-process/app-process.slice';
import { getSortByTypeName, getSortOrderName } from '../../utils/utils';
import useSortNavigation from '../../hooks/use-sort-navigation';

type SortProps = {
  activeSortType: SortType | null;
  activeSortOrder: SortOrder | null;
};

function Sorting({ activeSortType, activeSortOrder }: SortProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortTypeChange = (type: SortType) => {
    searchParams.set('search_type', type);
    setSearchParams(searchParams);
    dispatch(setSortByType(type));
  };

  const handleSortOrderChange = (order: SortOrder) => {
    searchParams.set('search_order', order);
    setSearchParams(searchParams);
    dispatch(setSortOrder(order));
  };

  useSortNavigation(activeSortType, activeSortOrder);

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {Object.values(SortType).map((type) => (
              <div key={type} className="catalog-sort__btn-text">
                <input
                  type="radio"
                  id={type}
                  name="sort"
                  checked={type === activeSortType}
                  onChange={() => handleSortTypeChange(type)}
                />
                <label htmlFor={type}>{getSortByTypeName(type)}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {Object.values(SortOrder).map((order) => (
              <div
                key={order}
                className={cn(
                  'catalog-sort__btn',
                  `catalog-sort__btn--${order}`
                )}
              >
                <input
                  type="radio"
                  id={order}
                  name="sort-icon"
                  aria-label={getSortOrderName(order)}
                  checked={order === activeSortOrder}
                  onChange={() => handleSortOrderChange(order)}
                />
                <label htmlFor={order}>
                  <svg width={16} height={14} aria-hidden="true">
                    <use xlinkHref="#icon-sort" />
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sorting;
