import { useNavigate } from 'react-router-dom';
import { AppRoute, Category, Level, Type } from '../../const';
import { useAppDispatch } from '../../hooks';
import {
  resetFilters,
  setActiveCategory,
  setActiveLevel,
  setActiveType,
} from '../../store/app-process/app-process.slice';
import {
  getCategoryUrl,
  getCorrectFilterCategory,
  getLevelUrl,
  getTypeUrl,
} from '../../utils/utils';

type FilterProps = {
  activeFilterCategory: Category | null;
  activeFilterType: Type[];
  activeFilterLevel: Level[];
};

function Filters({
  activeFilterCategory,
  activeFilterType,
  activeFilterLevel,
}: FilterProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <form action="#">
      <h2 className="visually-hidden">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="custom-input">
            <label>
              <input type="number" name="price" placeholder="от" />
            </label>
          </div>
          <div className="custom-input">
            <label>
              <input type="number" name="priceUp" placeholder="до" />
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Категория</legend>
        {Object.entries(Category).map(([name, category]) => (
          <div key={category} className="custom-checkbox catalog-filter__item">
            <label>
              <input
                onChange={() => {
                  dispatch(setActiveCategory(category));
                  navigate(
                    `${AppRoute.Catalog}?cat=${getCategoryUrl(category)}`
                  );
                }}
                checked={category === activeFilterCategory}
                type="checkbox"
                name={name}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">
                {getCorrectFilterCategory(category)}
              </span>
            </label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Тип камеры</legend>
        {Object.entries(Type).map(([name, type]) => (
          <div key={type} className="custom-checkbox catalog-filter__item">
            <label>
              <input
                onChange={() => {
                  dispatch(setActiveType(type));
                  navigate(`${AppRoute.Catalog}?type=${getTypeUrl(type)}`);
                }}
                checked={activeFilterType?.includes(type)}
                type="checkbox"
                name={name}
                disabled={
                  activeFilterCategory === Category.Camcorder &&
                  (type === Type.Collectors || type === Type.Instant)
                }
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">{type}</span>
            </label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Уровень</legend>
        {Object.entries(Level).map(([key, level]) => (
          <div key={level} className="custom-checkbox catalog-filter__item">
            <label>
              <input
                onChange={() => {
                  dispatch(setActiveLevel(level));
                  navigate(`${AppRoute.Catalog}?level=${getLevelUrl(level)}`);
                }}
                checked={activeFilterLevel?.includes(level)}
                type="checkbox"
                name={key}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">{level}</span>
            </label>
          </div>
        ))}
      </fieldset>
      <button
        onClick={() => dispatch(resetFilters())}
        className="btn catalog-filter__reset-btn"
        type="reset"
      >
        Сбросить фильтры
      </button>
    </form>
  );
}

export default Filters;
