import { useSearchParams } from 'react-router-dom';
import { Level, DEFAULT_PAGE } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import {
  setCurrentPage,
  setActiveLevel,
} from '../../../store/app-process/app-process.slice';

type LevelFilterProps = {
  activeFilterLevel: Level[];
};

function LevelFilter({ activeFilterLevel }: LevelFilterProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleleLevelChange = (level: Level) => {
    dispatch(setCurrentPage(DEFAULT_PAGE));
    searchParams.set('page', String(DEFAULT_PAGE));
    setSearchParams(searchParams);
    dispatch(setActiveLevel(level));
    if (activeFilterLevel.includes(level)) {
      searchParams.set(
        'level',
        activeFilterLevel
          .filter((activeLevel) => activeLevel !== level)
          .toString()
      );
      if (activeFilterLevel.length === 1) {
        searchParams.delete('level');
      }
    } else {
      searchParams.set('level', [...activeFilterLevel, level].toString());
    }

    setSearchParams(searchParams);
  };

  return (
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
  );
}

export default LevelFilter;
