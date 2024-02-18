import { Link } from 'react-router-dom';
import { AppRoute, PageBlock } from '../../const';
import { TCamera } from '../../types/cameras';
import classNames from 'classnames';

type BreadcrumbsProps = {
  pageBlock: PageBlock;
  camera?: TCamera;
};

function Breadcrumbs({ pageBlock, camera }: BreadcrumbsProps): JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link to={AppRoute.Catalog} className="breadcrumbs__link">
              {'Главная '}
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link
              to={AppRoute.Catalog}
              className={classNames('breadcrumbs__link', {
                'breadcrumbs__link--active': pageBlock === PageBlock.Catalog,
              })}
            >
              {'Каталог '}
              {pageBlock !== PageBlock.Catalog && (
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>
              )}
            </Link>
          </li>
          {(pageBlock === PageBlock.Camera ||
            pageBlock === PageBlock.Order) && (
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                {pageBlock === PageBlock.Camera && camera?.name}
                {pageBlock === PageBlock.Order && 'Корзина'}
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
