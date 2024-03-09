import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '.';
import { useEffect } from 'react';
import { setCurrentPage } from '../store/app-process/app-process.slice';
import { TIMEOUT_DELAY } from '../const';

const usePageNavigation = (
  totalPages: number,
  currentPage: number,
  camerasOnPage: boolean
) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  setTimeout(() => {
    if (!camerasOnPage) {
      dispatch(setCurrentPage(1));
      searchParams.set('page', String(1));
      setSearchParams(searchParams);
    }
  }, TIMEOUT_DELAY);

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const parsedPage = pageParam ? Number(pageParam) : 1;
    const isValidPage =
      !isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages;

    if (parsedPage !== currentPage) {
      if (isValidPage && camerasOnPage) {
        dispatch(setCurrentPage(parsedPage));
      } else {
        dispatch(setCurrentPage(currentPage));
        searchParams.set('page', String(currentPage));
        setSearchParams(searchParams);
      }
    }
  }, [
    currentPage,
    totalPages,
    searchParams,
    setSearchParams,
    dispatch,
    camerasOnPage,
  ]);
};

export default usePageNavigation;
