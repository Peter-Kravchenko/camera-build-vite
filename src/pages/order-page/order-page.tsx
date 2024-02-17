import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import OrderList from '../../components/order-list/order-list';
import OrderSummary from '../../components/order-summary/order-summary';
import { PageBlock } from '../../const';

function OrderPage(): JSX.Element {
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
    </main>
  );
}

export default OrderPage;
