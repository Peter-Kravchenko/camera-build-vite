import cn from 'classnames';
import { SortByType, SortOrder } from '../../const';
import { useAppDispatch } from '../../hooks';
import {
  setSortByType,
  setSortOrder,
} from '../../store/app-process/app-process.slice';
import { getSortByTypeName, getSortOrderName } from '../../utils/utils';

type SortProps = {
  activeSortByType: SortByType;
  activeSortOrder: SortOrder;
};

function Sorting({
  activeSortByType,
  activeSortOrder,
}: SortProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {Object.values(SortByType).map((type) => (
              <div key={type} className="catalog-sort__btn-text">
                <input
                  type="radio"
                  id={type}
                  name="sort"
                  defaultChecked={type === activeSortByType}
                  onClick={() => dispatch(setSortByType(type as SortByType))}
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
                  defaultChecked={order === activeSortOrder}
                  onClick={() => dispatch(setSortOrder(order as SortOrder))}
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
