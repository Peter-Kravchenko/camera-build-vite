import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ModalData from '../../components/modals/modal-data/modal-data';
import OrderList from '../../components/order-list/order-list';
import OrderDetails from '../../components/order-details/order-details';
import { AppRoute, PageBlock } from '../../const';
import { useAppSelector } from '../../hooks';
import { checkModalOpen } from '../../store/modal-process/modal-process.selectors';
import { getOrders } from '../../store/order-data/order-data.selectors';
import { Link } from 'react-router-dom';

function OrderPage(): JSX.Element {
  const isModalOpen = useAppSelector(checkModalOpen);

  const orders = useAppSelector(getOrders);

  const searchInput = document.querySelector(
    '.form-search__input'
  ) as HTMLInputElement;

  return (
    <main>
      <div className="page-content" data-testid="order-page">
        <Breadcrumbs pageBlock={PageBlock.Order} />
        <section className="basket">
          {orders.length ? (
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <OrderList orders={orders} />
              <OrderDetails orders={orders} />
            </div>
          ) : (
            <div className="container">
              <h1 className="title title--h2">Корзина пустая</h1>
              <h1 className="title title--h3">
                Выберите камеру в <Link to={AppRoute.Catalog}>каталоге </Link>
                или воспользуйтесь{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => searchInput.focus()}
                >
                  поиском
                </a>
              </h1>
            </div>
          )}
        </section>
      </div>
      {isModalOpen && <ModalData />}
    </main>
  );
}

export default OrderPage;
