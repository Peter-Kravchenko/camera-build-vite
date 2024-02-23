import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import OrderButton from '../buttons/order-button/order-button';
import SearchForm from '../search-form/search-form';

function Header(): JSX.Element {
  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        <Link
          to={AppRoute.Catalog}
          className="header__logo"
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link to={AppRoute.Catalog} className="main-nav__link">
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <OrderButton />
      </div>
    </header>
  );
}

export default Header;
