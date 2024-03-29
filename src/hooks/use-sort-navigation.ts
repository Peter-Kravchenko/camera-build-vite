import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { SortType, SortOrder } from '../const';
import {
  setSortByType,
  setSortOrder,
} from '../store/app-process/app-process.slice';
import { useAppDispatch } from '.';

const useSortNavigation = (
  activeSortType: SortType | null,
  activeSortOrder: SortOrder | null
) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sortTypeParams = searchParams.get('search_type');
    const sortOrderParams = searchParams.get('search_order');

    const isValidTypeParams =
      sortTypeParams &&
      Object.values(SortType).includes(sortTypeParams as SortType);
    const isValidOrderParams =
      sortOrderParams &&
      Object.values(SortOrder).includes(sortOrderParams as SortOrder);

    if (sortTypeParams !== activeSortType) {
      if (isValidTypeParams) {
        dispatch(setSortByType(sortTypeParams as SortType));
      } else {
        searchParams.delete('search_type');
        setSearchParams(searchParams);
      }
    }

    if (sortOrderParams !== activeSortOrder) {
      if (isValidOrderParams) {
        dispatch(setSortOrder(sortOrderParams as SortOrder));
      } else {
        searchParams.delete('search_order');
        setSearchParams(searchParams);
      }
    }
  }, [
    activeSortType,
    activeSortOrder,
    searchParams,
    setSearchParams,
    dispatch,
  ]);
};

export default useSortNavigation;
