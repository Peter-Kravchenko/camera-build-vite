import { useSearchParams } from 'react-router-dom';
import { Category, Level, ValidationMap, Type } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import { resetFilters } from '../../../store/app-process/app-process.slice';
import useFilterNavigation from '../../../hooks/use-filter-navigation';
import { TMaxPrice, TMinPrice } from '../../../types/state';
import { TCameras } from '../../../types/cameras';
import { useState } from 'react';
import PriceFilter from '../price-filter/price-filter';
import CategoryFilter from '../category-filter/category-filter';
import TypeFilter from '../type-filter/type-filter';
import LevelFilter from '../level-filter/level-filter';

type FiltersDataProps = {
  cameras: TCameras;
  activeMinPrice: TMinPrice;
  activeMaxPrice: TMaxPrice;
  activeFilterCategory: Category | null;
  activeFilterType: Type[];
  activeFilterLevel: Level[];
};

function FiltersData({
  cameras,
  activeMinPrice,
  activeMaxPrice,
  activeFilterCategory,
  activeFilterType,
  activeFilterLevel,
}: FiltersDataProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isPriceValid, setIsPriceValid] = useState({
    min: ValidationMap.Idle,
    max: ValidationMap.Idle,
  });

  const handleResetFiltersClick = () => {
    dispatch(resetFilters());
    searchParams.delete('gte');
    searchParams.delete('lte');
    searchParams.delete('category');
    searchParams.delete('type');
    searchParams.delete('level');
    setSearchParams(searchParams);
    setIsPriceValid({
      min: ValidationMap.Idle,
      max: ValidationMap.Idle,
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
      <PriceFilter
        cameras={cameras}
        activeMinPrice={activeMinPrice}
        activeMaxPrice={activeMaxPrice}
        isPriceValid={isPriceValid}
        setIsPriceValid={setIsPriceValid}
      />
      <CategoryFilter
        activeFilterCategory={activeFilterCategory}
        activeFilterType={activeFilterType}
      />
      <TypeFilter
        activeFilterType={activeFilterType}
        activeFilterCategory={activeFilterCategory}
      />
      <LevelFilter activeFilterLevel={activeFilterLevel} />
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

export default FiltersData;
