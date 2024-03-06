import { useEffect } from 'react';
import { Category, Type, Level } from '../const';
import {
  setActiveCategory,
  setActiveType,
  setActiveLevel,
  setActiveMinPrice,
  setActiveMaxPrice,
} from '../store/app-process/app-process.slice';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '.';
import { TMaxPrice, TMinPrice } from '../types/state';

const useFilterNavigation = (
  activeMinPrice: TMinPrice | null,
  activeMaxPrice: TMaxPrice | null,
  activeFilterCategory: Category | null,
  activeFilterType: Type[],
  activeFilterLevel: Level[]
) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const filterMinPriceParams = Number(searchParams.get('gte'));
    const filterMaxPriceParams = Number(searchParams.get('lte'));
    const filterCategoryParams = searchParams.get('category');
    const filterTypeParams = searchParams.get('type');
    const filterLevelParams = searchParams.get('level');

    const isValidMinPriceParams =
      filterMinPriceParams > 0 && filterMinPriceParams <= filterMaxPriceParams;
    const isValidMaxPriceParams =
      filterMinPriceParams > 0 && filterMaxPriceParams >= filterMinPriceParams;
    const isValidCategotyParams =
      filterCategoryParams &&
      Object.values(Category).includes(filterCategoryParams as Category);
    const isValidTypeParams =
      filterTypeParams &&
      filterTypeParams
        .split(',')
        .map((type) => Object.values(Type).includes(type as Type))
        .every(Boolean);
    const isValidLevelParams =
      filterLevelParams &&
      filterLevelParams
        .split(',')
        .map((level) => Object.values(Level).includes(level as Level))
        .every(Boolean);

    if (filterMinPriceParams !== activeMinPrice) {
      if (isValidMinPriceParams) {
        dispatch(setActiveMinPrice(filterMinPriceParams));
      } else {
        searchParams.delete('gte');
        setSearchParams(searchParams);
      }
    }

    if (filterMaxPriceParams !== activeMaxPrice) {
      if (isValidMaxPriceParams) {
        dispatch(setActiveMaxPrice(filterMaxPriceParams));
      }
    }
    if (filterCategoryParams !== activeFilterCategory) {
      if (isValidCategotyParams) {
        dispatch(setActiveCategory(filterCategoryParams as Category));
      } else {
        searchParams.delete('category');
        setSearchParams(searchParams);
      }
    }

    if (filterTypeParams !== activeFilterType.toString()) {
      if (isValidTypeParams) {
        filterTypeParams?.split(',').map((type) => {
          dispatch(setActiveType(type as Type));
        });
      } else {
        searchParams.delete('type');
        setSearchParams(searchParams);
      }
    }

    if (filterLevelParams !== activeFilterLevel.toString()) {
      if (isValidLevelParams) {
        filterLevelParams?.split(',').map((level) => {
          dispatch(setActiveLevel(level as Level));
        });
      } else {
        searchParams.delete('level');
        setSearchParams(searchParams);
      }
    }
  }, [
    activeMinPrice,
    activeMaxPrice,
    activeFilterCategory,
    activeFilterType,
    activeFilterLevel,
    searchParams,
    setSearchParams,
    dispatch,
  ]);
};

export default useFilterNavigation;
