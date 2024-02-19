import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '.';
import { useEffect } from 'react';
import { AppRoute } from '../const';
import { setCurrentPage } from '../store/app-process/app-process.slice';

const usePageNavigation = (totalPages: number, currentPage: number) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    const parsedPage = pageParam ? Number(pageParam) : 1;
    const isValidPage =
      !isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages;

    if (parsedPage !== currentPage) {
      if (isValidPage) {
        dispatch(setCurrentPage(parsedPage));
      } else {
        navigate(AppRoute.NotFound);
      }
    }
  }, [currentPage, dispatch, location, navigate, totalPages]);
};

export default usePageNavigation;
