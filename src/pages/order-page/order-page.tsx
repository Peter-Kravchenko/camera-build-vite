import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ModalData from '../../components/modals/modal-data/modal-data';
import OrderList from '../../components/order-list/order-list';
import OrderSummary from '../../components/order-summary/order-summary';
import { PageBlock } from '../../const';
import { useAppSelector } from '../../hooks';
import { checkModalOpen } from '../../store/modal-process/modal-process.selectors';

function OrderPage(): JSX.Element {
  const isModalOpen = useAppSelector(checkModalOpen);

  return (
    <main>
      <div className="page-content" data-testid="order-page">
        <Breadcrumbs pageBlock={PageBlock.Order} />
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            <OrderList />
            <OrderSummary />
          </div>
        </section>
      </div>
      {isModalOpen && <ModalData />}
    </main>
  );
}

export default OrderPage;
