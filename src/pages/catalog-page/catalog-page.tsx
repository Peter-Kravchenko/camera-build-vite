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
  getPromo,
  getPromoFetchingStatus,
} from '../../store/promo-data/promo-data.selectors';

function CatalogPage(): JSX.Element {
  const promo = useAppSelector(getPromo);
  const promoFetchingStatus = useAppSelector(getPromoFetchingStatus);

  const cameras = useAppSelector(getCameras);
  const cemerasFetchingStatus = useAppSelector(getCamerasFetchingStatus);

  const camerasToRender = cameras.slice(0, 9);

  if (
    cemerasFetchingStatus === RequestStatus.Pending &&
    promoFetchingStatus === RequestStatus.Pending
  ) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      {promo.length && <Banner promo={promo} />}
      <div className="page-content">
        <Breadcrumbs />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <div className="catalog-filter">
                  {/* здесь будет компонент <Filters /> сейчас он мешает */}
                </div>
              </div>
              <div className="catalog__content">
                {/* здесь будет компонент <Sorting /> сейчас он мешает */}
                <CatalogCamerasList cameras={camerasToRender} />
                <Pagination />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CatalogPage;
