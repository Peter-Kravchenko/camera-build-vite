import { useSearchParams } from 'react-router-dom';
import { Category, Level, Type } from '../../const';
import { useAppDispatch } from '../../hooks';
import {
  resetFilters,
  setActiveCategory,
  setActiveLevel,
  setActiveType,
} from '../../store/app-process/app-process.slice';
import { getCorrectFilterCategory } from '../../utils/utils';
import useFilterNavigation from '../../hooks/use-filter-navigation';

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

  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategoryChange = (category: Category) => {
    dispatch(setActiveCategory(category));
    if (activeFilterCategory === category) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleTypeChange = (type: Type) => {
    dispatch(setActiveType(type));
    if (activeFilterType.includes(type)) {
      searchParams.set(
        'type',
        activeFilterType.filter((t) => t !== type).toString()
      );

      if (activeFilterType.length === 1) {
        searchParams.delete('type');
      }
    } else {
      searchParams.set('type', [...activeFilterType, type].toString());
    }

    setSearchParams(searchParams);
  };

  const handleleLevelChange = (level: Level) => {
    dispatch(setActiveLevel(level));
    if (activeFilterLevel.includes(level)) {
      searchParams.set(
        'level',
        activeFilterLevel.filter((l) => l !== level).toString()
      );
      if (activeFilterLevel.length === 1) {
        searchParams.delete('level');
      }
    } else {
      searchParams.set('level', [...activeFilterLevel, level].toString());
    }

    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    searchParams.delete('category');
    searchParams.delete('type');
    searchParams.delete('level');
    setSearchParams(searchParams);
  };

  useFilterNavigation(
    activeFilterCategory,
    activeFilterType,
    activeFilterLevel
  );

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
                onChange={() => handleCategoryChange(category)}
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
                onChange={() => handleTypeChange(type)}
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
                onChange={() => handleleLevelChange(level)}
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
        onClick={() => handleResetFilters()}
        className="btn catalog-filter__reset-btn"
        type="reset"
      >
        Сбросить фильтры
      </button>
    </form>
  );
}

export default Filters;
