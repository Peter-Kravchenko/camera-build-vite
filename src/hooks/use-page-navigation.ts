import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '.';
import { useEffect } from 'react';
import { setCurrentPage } from '../store/app-process/app-process.slice';

const usePageNavigation = (totalPages: number, currentPage: number) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const parsedPage = pageParam ? Number(pageParam) : 1;
    const isValidPage =
      !isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages;

    if (parsedPage !== currentPage) {
      if (isValidPage) {
        dispatch(setCurrentPage(parsedPage));
      } else {
        searchParams.delete('page');
        setSearchParams(searchParams);
      }
    }
  }, [currentPage, totalPages, searchParams, setSearchParams, dispatch]);
};

export default usePageNavigation;
