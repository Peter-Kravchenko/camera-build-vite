import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogCamerasList from '../../components/catalog-cameras-list/catalog-cameras-list';
import Pagination from '../../components/pagination/pagination';
import Banner from '../../components/banner/banner';
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

import AddTobasketModal from '../../components/modals/add-to-basket-modal/add-tobasket-modal';
import {
  getModalAddToBasketOpen,
  getModalAddToBasketSuccessOpen,
  getModalStatus,
} from '../../store/modal-process/modal-process.selectors';
import AddToBasketSuccessModal from '../../components/modals/add-to-basket-success-modal/add-to-basket-success-modal';
import { getCurrentPage } from '../../store/app-process/app-process.selectors';
import { getCamerasFromCurrentPage } from '../../utils';
import { useEffect } from 'react';
import { resetAppProcess } from '../../store/app-process/app-process.slice';
import {
  closeAddReviewModal,
  closeAddReviewSuccessModal,
} from '../../store/modal-process/modal-process.slice';

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const promos = useAppSelector(getPromos);
  const promosFetchingStatus = useAppSelector(getPromosFetchingStatus);

  const cameras = useAppSelector(getCameras);
  const cemerasFetchingStatus = useAppSelector(getCamerasFetchingStatus);

  const isModalOpen = useAppSelector(getModalAddToBasketOpen);
  const isModalSuccessOpen = useAppSelector(getModalAddToBasketSuccessOpen);

  const modalStatus = useAppSelector(getModalStatus);
  if (modalStatus.isModalAddReviewOpen) {
    dispatch(closeAddReviewModal());
  } else if (modalStatus.isModalAddReviewSuccessOpen) {
    dispatch(closeAddReviewSuccessModal());
  }
  // Устраняет баг, если при открытом модальном окне отзыва вернуться в каталог, то состояние модального окна не изменится и страница зависает

  const currentPage = useAppSelector(getCurrentPage);
  const camerasToRender = getCamerasFromCurrentPage(
    cameras,
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
    <main>
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
                  <Sorting />
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
      {isModalOpen && <AddTobasketModal />}
      {isModalSuccessOpen && <AddToBasketSuccessModal />}
    </main>
  );
}

export default CatalogPage;
