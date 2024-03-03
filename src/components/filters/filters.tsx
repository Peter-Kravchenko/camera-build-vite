import { useSearchParams } from 'react-router-dom';
import { Category, Level, Type } from '../../const';
import { useAppDispatch } from '../../hooks';
import {
  resetFilters,
  setActiveCategory,
  setActiveLevel,
  setActiveMaxPrice,
  setActiveMinPrice,
  setActiveType,
} from '../../store/app-process/app-process.slice';
import {
  getCorrectFilterCategory,
  getMaxCamPrice,
  getMinCamPrice,
} from '../../utils/utils';
import useFilterNavigation from '../../hooks/use-filter-navigation';
import { TMaxPrice, TMinPrice } from '../../types/state';
import { TCameras } from '../../types/cameras';
import { useState } from 'react';

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

  const [priceValue, setPriceValue] = useState({
    min: activeMinPrice,
    max: activeMaxPrice,
  });

  // const camsPrice = setPriceByCams(cameras, activePrice.min, activePrice.max);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target);

    setPriceValue({
      ...priceValue,
      [name]: Number(value),
    });
  };

  const handleBlurPrice = () => {
    if (priceValue.min) {
      const minCamPrice = getMinCamPrice(cameras, priceValue.min);
      setPriceValue({
        ...priceValue,
        min: minCamPrice,
      });

      dispatch(setActiveMinPrice(priceValue.min));
      searchParams.set('min_price', String(priceValue.min));
      setSearchParams(searchParams);
    }

    if (priceValue.max) {
      const maxCamPrice = getMaxCamPrice(cameras, priceValue.max);
      setPriceValue({
        ...priceValue,
        max: maxCamPrice,
      });

      dispatch(setActiveMaxPrice(priceValue.max));
      searchParams.set('max_price', String(priceValue.max));
      setSearchParams(searchParams);
    }

    // if (priceValue.min && priceValue.max) {
    //   if (priceValue.min > priceValue.max) {
    //     setPriceValue({
    //       ...priceValue,
    //       min: priceValue.max,
    //     });
    //   }
    //   if (priceValue.max < priceValue.min) {
    //     setPriceValue({
    //       ...priceValue,
    //       max: priceValue.min,
    //     });
    //   }
    // }
  };

  console.log('priceValue', priceValue);

  const handleCategoryChange = (category: Category) => {
    dispatch(
      setActiveCategory(category === activeFilterCategory ? null : category)
    );
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
    searchParams.delete('min_price');
    searchParams.delete('max_price');
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
              <input
                type="number"
                name="min"
                placeholder="от"
                value={priceValue.min || ''}
                onBlur={handleBlurPrice}
                onChange={handlePriceChange}
              />
            </label>
          </div>
          <div className="custom-input">
            <label>
              <input
                type="number"
                name="max"
                placeholder="до"
                onBlur={handleBlurPrice}
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
