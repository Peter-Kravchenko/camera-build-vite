import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogCamerasList from '../../components/catalog-cameras-list/catalog-cameras-list';
import Pagination from '../../components/pagination/pagination';
import Banner from '../../components/banner/banner';
import { RequestStatus } from '../../const';
import { useAppSelector } from '../../hooks/index';
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
import { getModalAddToBasketOpen } from '../../store/modal-process/modal-process.selectors';

function CatalogPage(): JSX.Element {
  const promos = useAppSelector(getPromos);
  const promosFetchingStatus = useAppSelector(getPromosFetchingStatus);

  const cameras = useAppSelector(getCameras);
  const cemerasFetchingStatus = useAppSelector(getCamerasFetchingStatus);

  const isModalOpen = useAppSelector(getModalAddToBasketOpen);

  const camerasToRender = cameras.slice(0, 9);

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
        <Breadcrumbs />
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
                  <Pagination />
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
      {isModalOpen === true && <AddTobasketModal />}
    </main>
  );
}

export default CatalogPage;
