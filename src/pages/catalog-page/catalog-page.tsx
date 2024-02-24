import { MAX_CAMERAS_ON_PAGE, PageBlock, RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import {
  getCameras,
  getCamerasFetchingStatus,
} from '../../store/cameras-data/cameras-data.selectors';
import {
  getPromos,
  getPromosFetchingStatus,
} from '../../store/promos-data/promos-data.selectors';
import Filters from '../../components/filters/filters';
import Sorting from '../../components/sorting/sorting';

import { checkModalOpen } from '../../store/modal-process/modal-process.selectors';
import {
  getActiveCategory,
  getActiveLevel,
  getActivePrice,
  getActiveType,
  getCurrentPage,
  getSortByType,
  getSortOrder,
} from '../../store/app-process/app-process.selectors';
import {
  filterCameras,
  getCamerasFromCurrentPage,
  sortCameras,
} from '../../utils/utils';
import { useEffect } from 'react';
import {
  resetAppProcess,
  resetFilters,
} from '../../store/app-process/app-process.slice';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Banner from '../../components/banner/banner';
import CatalogCamerasList from '../../components/catalog-cameras-list/catalog-cameras-list';
import Pagination from '../../components/pagination/pagination';
import ModalData from '../../components/modals/modal-data/modal-data';
import { TCameras } from '../../types/cameras';
import Loader from '../../components/loader/loader';

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const promos = useAppSelector(getPromos);
  const promosFetchingStatus = useAppSelector(getPromosFetchingStatus);

  const cameras = useAppSelector(getCameras);
  const cemerasFetchingStatus = useAppSelector(getCamerasFetchingStatus);

  const activeFilterPrice = useAppSelector(getActivePrice);
  const activeFilterType = useAppSelector(getActiveType);
  const activeFilterLevel = useAppSelector(getActiveLevel);
  const activeFilterCategory = useAppSelector(getActiveCategory);

  const activeSortByType = useAppSelector(getSortByType);
  const activeSortOrder = useAppSelector(getSortOrder);

  const isModalOpen = useAppSelector(checkModalOpen);

  const currentPage = useAppSelector(getCurrentPage);

  const filteredCameras: TCameras = filterCameras(
    cameras,
    activeFilterCategory,
    activeFilterType,
    activeFilterLevel
  );

  const sortedCameras: TCameras = sortCameras(
    filteredCameras,
    activeSortByType,
    activeSortOrder
  );

  const camerasToRender = getCamerasFromCurrentPage(
    sortedCameras,
    currentPage,
    MAX_CAMERAS_ON_PAGE
  );

  useEffect(() => {
    dispatch(resetAppProcess());
    dispatch(resetFilters());
  }, [dispatch]);

  if (
    cemerasFetchingStatus === RequestStatus.Pending ||
    promosFetchingStatus === RequestStatus.Pending
  ) {
    return <Loader />;
  }

  return (
    <main data-testid="catalog-page">
      {promos && <Banner promos={promos} />}
      <div className="page-content">
        <Breadcrumbs pageBlock={PageBlock.Catalog} />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            {cameras.length > 0 ? (
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <div className="catalog-filter">
                    <Filters
                      activeFilterPrice={activeFilterPrice}
                      activeFilterCategory={activeFilterCategory}
                      activeFilterType={activeFilterType}
                      activeFilterLevel={activeFilterLevel}
                    />
                  </div>
                </div>
                <div className="catalog__content">
                  <Sorting
                    activeSortByType={activeSortByType}
                    activeSortOrder={activeSortOrder}
                  />
                  {camerasToRender.length > 0 ? (
                    <CatalogCamerasList cameras={camerasToRender} />
                  ) : (
                    <div className="title title--h3" style={{ marginTop: 100 }}>
                      По вашему запросу ничего не найдено
                    </div>
                  )}
                  {sortedCameras.length > MAX_CAMERAS_ON_PAGE && (
                    <Pagination
                      cameras={sortedCameras}
                      currentPage={currentPage}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="title title--h3">
                Камеры не найдены на сервере
              </div>
            )}
          </div>
        </section>
      </div>
      {isModalOpen && <ModalData />}
    </main>
  );
}

export default CatalogPage;
