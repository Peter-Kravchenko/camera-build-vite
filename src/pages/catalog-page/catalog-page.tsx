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

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const promos = useAppSelector(getPromos);
  const promosFetchingStatus = useAppSelector(getPromosFetchingStatus);

  const cameras = useAppSelector(getCameras);
  const cemerasFetchingStatus = useAppSelector(getCamerasFetchingStatus);

  const activeSortByType = useAppSelector(getSortByType);
  const activeSortOrder = useAppSelector(getSortOrder);

  let sortedCameras: TCameras = cameras;

  if (activeSortByType === SortByType.Popularity) {
    sortedCameras = sortCamerasByPopularity[activeSortOrder](cameras);
  } else if (activeSortByType === SortByType.Price) {
    sortedCameras = sortCamerasByPrice[activeSortOrder](cameras);
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
    return <h1>Loading...</h1>;
  }

  return (
    <main data-testid="catalog-page">
      {promos && <Banner promos={promos} />}
      <div className="page-content">
        <Breadcrumbs pageBlock={PageBlock.Catalog} />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            {camerasToRender.length > 0 ? (
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
                  <CatalogCamerasList cameras={camerasToRender} />
                  {cameras.length > MAX_CAMERAS_ON_PAGE && (
                    <Pagination cameras={cameras} currentPage={currentPage} />
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
