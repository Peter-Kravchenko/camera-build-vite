import { useNavigate } from 'react-router-dom';
import { AppRoute, Category, Level, Type } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getActiveCategory,
  getActiveLevel,
  getActiveType,
} from '../../store/app-process/app-process.selectors';
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

function Filters(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeCategory = useAppSelector(getActiveCategory);
  const activeType = useAppSelector(getActiveType);
  const activeLevel = useAppSelector(getActiveLevel);

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
        {Object.entries(Category).map(([key, category]) => (
          <div key={category} className="custom-checkbox catalog-filter__item">
            <label>
              <input
                onChange={() => {
                  dispatch(setActiveCategory(category));
                  navigate(
                    `${AppRoute.Catalog}?cat=${getCategoryUrl(category)}`
                  );
                }}
                checked={category === activeCategory}
                type="checkbox"
                name={key}
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
        {Object.entries(Type).map(([key, type]) => (
          <div key={type} className="custom-checkbox catalog-filter__item">
            <label>
              <input
                onChange={() => {
                  dispatch(setActiveType(type));
                  navigate(`${AppRoute.Catalog}?type=${getTypeUrl(type)}`);
                }}
                checked={activeType?.includes(type)}
                type="checkbox"
                name={key}
                disabled={
                  activeCategory === Category.Camcorder &&
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
                checked={activeLevel?.includes(level)}
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
        onClick={() => dispatch(resetFilters)}
        className="btn catalog-filter__reset-btn"
        type="reset"
      >
        Сбросить фильтры
      </button>
    </form>
  );
}

export default Filters;
