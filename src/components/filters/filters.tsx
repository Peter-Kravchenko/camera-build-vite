import { useSearchParams } from 'react-router-dom';
import {
  Category,
  DEFAULT_PAGE,
  Level,
  PriceValidation,
  Type,
} from '../../const';
import { useAppDispatch } from '../../hooks';
import {
  resetFilters,
  resetTypeFilmAndInstant,
  setActiveCategory,
  setActiveLevel,
  setActiveMaxPrice,
  setActiveMinPrice,
  setActiveType,
  setCurrentPage,
} from '../../store/app-process/app-process.slice';
import {
  getCorrectFilterCategory,
  getMaxCamPrice,
  getCatalogMaxValue,
  getMinCamPrice,
  getCatalogMinValue,
} from '../../utils/utils';
import useFilterNavigation from '../../hooks/use-filter-navigation';
import { TMaxPrice, TMinPrice } from '../../types/state';
import { TCameras } from '../../types/cameras';
import { useEffect, useState } from 'react';
import cn from 'classnames';

type FilterProps = {
  cameras: TCameras;
  activeMinPrice: TMinPrice;
  activeMaxPrice: TMaxPrice;
  activeFilterCategory: Category | null;
  activeFilterType: Type[];
  activeFilterLevel: Level[];
};

function Filters({
  cameras,
  activeMinPrice,
  activeMaxPrice,
  activeFilterCategory,
  activeFilterType,
  activeFilterLevel,
}: FilterProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [catalogPriceValue, setCatalogPriceValue] = useState({
    min: '',
    max: '',
  });

  const [priceValue, setPriceValue] = useState({
    min: activeMinPrice,
    max: activeMaxPrice,
  });

  const [isPriceValid, setIsPriceValid] = useState({
    min: PriceValidation.Idle,
    max: PriceValidation.Idle,
  });

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceValue({
      ...priceValue,
      [name]: Number(value),
    });
  };

  const handleBlurMinPrice = () => {
    dispatch(setCurrentPage(DEFAULT_PAGE));
    searchParams.set('page', String(DEFAULT_PAGE));
    setSearchParams(searchParams);
    const isNotValidMinPrice =
      priceValue.min < 0 ||
      (priceValue.min > priceValue.max && priceValue.max !== 0);

    if (priceValue.min !== 0) {
      if (isNotValidMinPrice) {
        setIsPriceValid({
          ...isPriceValid,
          min: PriceValidation.Error,
        });
      } else {
        setIsPriceValid({
          ...isPriceValid,
          min: PriceValidation.Success,
        });
        dispatch(setActiveMinPrice(priceValue.min));
        searchParams.set('gte', String(priceValue.min));
        setSearchParams(searchParams);
      }
    } else {
      dispatch(setActiveMinPrice(0));
      searchParams.delete('gte');
      setSearchParams(searchParams);
      setIsPriceValid({
        ...isPriceValid,
        min: PriceValidation.Idle,
      });
    }
  };

  const handleBlurMaxPrice = () => {
    dispatch(setCurrentPage(DEFAULT_PAGE));
    searchParams.set('page', String(DEFAULT_PAGE));
    setSearchParams(searchParams);
    const isNotValidMaxPrice =
      priceValue.max < 0 ||
      (priceValue.max < priceValue.min && priceValue.min !== 0);

    if (priceValue.max !== 0) {
      if (isNotValidMaxPrice) {
        {
          setIsPriceValid({
            ...isPriceValid,
            max: PriceValidation.Error,
          });
        }
      } else {
        setIsPriceValid({
          ...isPriceValid,
          max: PriceValidation.Success,
        });
        dispatch(setActiveMaxPrice(priceValue.max));
        searchParams.set('lte', String(priceValue.max));
        setSearchParams(searchParams);
      }
    } else {
      dispatch(setActiveMaxPrice(0));
      searchParams.delete('lte');
      setSearchParams(searchParams);
      setIsPriceValid({
        ...isPriceValid,
        max: PriceValidation.Idle,
      });
    }
  };

  useEffect(() => {
    const catalogMinValue = getCatalogMinValue(cameras);
    const catalogMaxValue = getCatalogMaxValue(cameras);

    const minPriceValue = getMinCamPrice(catalogMinValue, activeMinPrice);
    const maxPriceValue = getMaxCamPrice(catalogMaxValue, activeMaxPrice);

    setPriceValue({
      min: minPriceValue,
      max: maxPriceValue,
    });

    setCatalogPriceValue({
      min: String(catalogMinValue),
      max: String(catalogMaxValue),
    });
  }, [activeMinPrice, activeMaxPrice, cameras]);

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

  const handleResetFiltersClick = () => {
    dispatch(resetFilters());
    searchParams.delete('gte');
    searchParams.delete('lte');
    searchParams.delete('category');
    searchParams.delete('type');
    searchParams.delete('level');
    setSearchParams(searchParams);
    setIsPriceValid({
      min: PriceValidation.Idle,
      max: PriceValidation.Idle,
    });
  };

  useFilterNavigation(
    activeMinPrice,
    activeMaxPrice,
    activeFilterCategory,
    activeFilterType,
    activeFilterLevel
  );

  return (
    <form action="#" data-testid="filters">
      <h2 className="visually-hidden">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div
            className={cn(
              'custom-input',
              { 'is-valid': isPriceValid.min === PriceValidation.Success },
              { 'is-invalid': isPriceValid.min === PriceValidation.Error }
            )}
          >
            <label>
              <input
                type="number"
                name="min"
                placeholder={catalogPriceValue.min || ''}
                value={priceValue.min || ''}
                onBlur={handleBlurMinPrice}
                onChange={handlePriceChange}
              />
            </label>
          </div>
          <div
            className={cn(
              'custom-input',
              { 'is-valid': isPriceValid.max === PriceValidation.Success },
              { 'is-invalid': isPriceValid.max === PriceValidation.Error }
            )}
          >
            <label>
              <input
                type="number"
                name="max"
                placeholder={catalogPriceValue.max || ''}
                onBlur={handleBlurMaxPrice}
                value={priceValue.max || ''}
                onChange={handlePriceChange}
              />
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
                  (type === Type.Film || type === Type.Instant)
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
        onClick={() => handleResetFiltersClick()}
        className="btn catalog-filter__reset-btn"
        type="reset"
      >
        Сбросить фильтры
      </button>
    </form>
  );
}

export default Filters;
