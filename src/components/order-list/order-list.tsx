import { TOrders } from '../../types/orders';
import OrderCard from '../order-card/order-card';

type OrderListProps = {
  orders: TOrders;
};

function OrderList({ orders }: OrderListProps): JSX.Element {
  return (
    <ul className="basket__list" data-testid="order-list">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </ul>
  );
}

export default OrderList;
