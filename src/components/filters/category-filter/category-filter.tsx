import { useSearchParams } from 'react-router-dom';
import { Category, DEFAULT_PAGE, Type } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import {
  setCurrentPage,
  setActiveCategory,
  resetTypeFilmAndInstant,
} from '../../../store/app-process/app-process.slice';
import { getCorrectFilterCategory } from '../../../utils/utils';

type TCategoryFilterProps = {
  activeFilterCategory: Category | null;
  activeFilterType: Type[];
};

function CategoryFilter({
  activeFilterCategory,
  activeFilterType,
}: TCategoryFilterProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleCategoryChange = (category: Category) => {
    dispatch(setCurrentPage(DEFAULT_PAGE));
    searchParams.set('page', String(DEFAULT_PAGE));
    setSearchParams(searchParams);
    dispatch(
      setActiveCategory(category === activeFilterCategory ? null : category)
    );
    if (
      (category === Category.Camcorder &&
        activeFilterType.includes(Type.Film)) ||
      activeFilterType.includes(Type.Instant)
    ) {
      dispatch(resetTypeFilmAndInstant());
      if (activeFilterType.length === 1) {
        searchParams.delete('type');
      } else {
        searchParams.set(
          'type',
          activeFilterType
            .filter(
              (activeType) =>
                activeType !== Type.Film && activeType !== Type.Instant
            )
            .toString()
        );
      }
    }
    if (activeFilterCategory === category) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
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
  );
}

export default CategoryFilter;
