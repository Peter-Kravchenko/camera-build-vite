import { useSearchParams } from 'react-router-dom';
import { Type, DEFAULT_PAGE, Category } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import {
  setCurrentPage,
  setActiveType,
} from '../../../store/app-process/app-process.slice';

type TypeFilterProps = {
  activeFilterType: Type[];
  activeFilterCategory: Category | null;
};

function TypeFilter({
  activeFilterType,
  activeFilterCategory,
}: TypeFilterProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTypeChange = (type: Type) => {
    dispatch(setCurrentPage(DEFAULT_PAGE));
    searchParams.set('page', String(DEFAULT_PAGE));
    setSearchParams(searchParams);
    dispatch(setActiveType(type));
    if (activeFilterType.includes(type)) {
      searchParams.set(
        'type',
        activeFilterType.filter((activeType) => activeType !== type).toString()
      );

      if (activeFilterType.length === 1) {
        searchParams.delete('type');
      }
    } else {
      searchParams.set('type', [...activeFilterType, type].toString());
    }

    setSearchParams(searchParams);
  };

  return (
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
                (type === Type.Film || type === Type.Instant)
              }
            />
            <span className="custom-checkbox__icon" />
            <span className="custom-checkbox__label">{type}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}

export default TypeFilter;
