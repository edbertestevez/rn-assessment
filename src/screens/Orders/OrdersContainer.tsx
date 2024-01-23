import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';

import Orders from './Orders';
import { OrdersNavigationProps } from '../../navigation/AppNavigator';
import Routes from '../../navigation/routes';
import customerStore from '../../stores/CustomerStore.tsx';
import orderStore from '../../stores/OrderStore.tsx';
import { Customer, CustomerId } from '../../types/Customer.ts';
import { Order, OrderId, OrderWithCustomerInfo } from '../../types/Order';

const formatOrders = (orders: Order[] = [], customers: Customer[] = []) => {
  const formattedData = orders.reduce(
    (acc: OrderWithCustomerInfo[], currOrder: Order) => {
      const customer = customers.find(
        (currCustomer) => currCustomer.customerId === currOrder.customerId,
      );

      return acc.concat({
        ...currOrder,
        customerName: customer?.customerName ?? 'Unknown',
      });
    },
    [],
  );

  return formattedData;
};

const OrdersContainer = ({
  navigation,
}: OrdersNavigationProps): React.JSX.Element => {
  const handleItemPress = useCallback(
    (orderId: OrderId, customerId: CustomerId) =>
      navigation.navigate(Routes.ORDER_DETAILS, { orderId, customerId }),
    [navigation],
  );

  const ordersList = formatOrders(orderStore.orders, customerStore.customers);

  return <Orders list={ordersList} handleItemPress={handleItemPress} />;
};

export default observer(OrdersContainer);
