import {
  MAX_CAMERAS_ON_PAGE,
  PageBlock,
  RequestStatus,
  SortByType,
} from '../../const';
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
  getActiveType,
  getCurrentPage,
  getSortByType,
  getSortOrder,
} from '../../store/app-process/app-process.selectors';
import {
  getCamerasFromCurrentPage,
  sortCamerasByPopularity,
  sortCamerasByPrice,
} from '../../utils/utils';
import { useEffect } from 'react';
import { resetAppProcess } from '../../store/app-process/app-process.slice';
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

  const activeFilterType = useAppSelector(getActiveType);
  const activeFilterLevel = useAppSelector(getActiveLevel);
  const activeFilterCategory = useAppSelector(getActiveCategory);

  const activeSortByType = useAppSelector(getSortByType);
  const activeSortOrder = useAppSelector(getSortOrder);

  let filteredCameras: TCameras = cameras;

  if (activeFilterCategory) {
    filteredCameras = filteredCameras.filter(
      (camera) => camera.category === activeFilterCategory
    );
  }
  if (activeFilterType.length) {
    filteredCameras = filteredCameras.filter((camera) =>
      activeFilterType.includes(camera.type)
    );
  }
  if (activeFilterLevel.length) {
    filteredCameras = filteredCameras.filter((camera) =>
      activeFilterLevel.includes(camera.level)
    );
  }

  let sortedCameras = filteredCameras;

  if (activeSortByType === SortByType.Popularity) {
    sortedCameras = sortCamerasByPopularity[activeSortOrder](filteredCameras);
  } else if (activeSortByType === SortByType.Price) {
    sortedCameras = sortCamerasByPrice[activeSortOrder](filteredCameras);
  }

  const isModalOpen = useAppSelector(checkModalOpen);

  const currentPage = useAppSelector(getCurrentPage);
  const camerasToRender = getCamerasFromCurrentPage(
    sortedCameras,
    currentPage,
    MAX_CAMERAS_ON_PAGE
  );

  useEffect(() => {
    dispatch(resetAppProcess());
  }, [dispatch]);

  if (
    cemerasFetchingStatus === RequestStatus.Pending &&
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
                    <Filters />
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
                      Камеры по указанным параметрам не найдены
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
