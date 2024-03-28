import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ModalData from '../../components/modals/modal-data/modal-data';
import OrderList from '../../components/order-list/order-list';
import OrderDetails from '../../components/order-details/order-details';
import { PageBlock } from '../../const';
import { useAppSelector } from '../../hooks';
import { checkModalOpen } from '../../store/modal-process/modal-process.selectors';
import { getOrders } from '../../store/order-data/order-data.selectors';

function OrderPage(): JSX.Element {
  const isModalOpen = useAppSelector(checkModalOpen);

  const orders = useAppSelector(getOrders);

  return (
    <main>
      <div className="page-content" data-testid="order-page">
        <Breadcrumbs pageBlock={PageBlock.Order} />
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            {orders.length ? (
              <>
                <OrderList orders={orders} />
                <OrderDetails orders={orders} />
              </>
            ) : (
              <h1>Корзина пуста</h1>
            )}
          </div>
        </section>
      </div>
      {isModalOpen && <ModalData />}
    </main>
  );
}

export default OrderPage;
