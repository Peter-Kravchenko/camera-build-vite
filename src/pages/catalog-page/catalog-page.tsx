import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogCamerasList from '../../components/catalog-cameras-list/catalog-cameras-list';
import Filters from '../../components/filters/filters';
import Pagination from '../../components/pagination/pagination';
import Promo from '../../components/promo/promo';
import Sorting from '../../components/sorting/sorting';
import { RequestStatus } from '../../const';
import { useAppSelector } from '../../hooks/index';
import {
  getCameras,
  getCamerasFetchingStatus,
} from '../../store/cameras-data/cameras-data.selectors';

function CatalogPage(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const cemerasFetchingStatus = useAppSelector(getCamerasFetchingStatus);

  const camerasToRender = cameras.slice(0, 9);

  if (cemerasFetchingStatus === RequestStatus.Pending) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      <Promo />
      <div className="page-content">
        <Breadcrumbs />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
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
          </div>
        </section>
      </div>
    </main>
  );
}

export default CatalogPage;
