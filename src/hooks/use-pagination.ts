import { MAX_CAMERAS_ON_PAGE, PAGES_PER_ITERATION } from '../const';
import { TCameras } from '../types/cameras';

const usePagination = (cameras: TCameras, currentPage: number) => {
  const totalPages = Math.ceil(cameras.length / MAX_CAMERAS_ON_PAGE);
  const currentIteration = Math.ceil(currentPage / PAGES_PER_ITERATION);
  const totalIterations = Math.ceil(totalPages / PAGES_PER_ITERATION);

  const lastPage = Math.min(currentIteration * PAGES_PER_ITERATION, totalPages);
  const firstPage = Math.max(
    lastPage - PAGES_PER_ITERATION + 1,
    currentIteration * PAGES_PER_ITERATION - PAGES_PER_ITERATION + 1
  );

  const pages: number[] = [];
  for (let i = firstPage; i <= lastPage; i++) {
    pages.push(i);
  }

  return {
    currentIteration,
    totalIterations,
    totalPages,
    firstPage,
    lastPage,
    pages,
  };
};

export default usePagination;
