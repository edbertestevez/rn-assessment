import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';

import Orders from './Orders';
import { formatOrdersWithCustomerInfo } from '../../helpers/format.ts';
import Routes from '../../navigation/routes.ts';
import customerStore from '../../stores/CustomerStore.tsx';
import orderStore from '../../stores/OrderStore.tsx';
import { CustomerId } from '../../types/Customer.ts';
import { OrderId } from '../../types/Order';
import useAppNavigator from '../../hooks/useAppNavigator.tsx';

// Note: navigation can be accessed via props from provider
// But for this technical challenge, I'll use the custom hooks created for stage #6
const OrdersContainer = (): React.JSX.Element => {
  const { navigateToOrderDetails } = useAppNavigator();

  const handleItemPress = useCallback(
    (orderId: OrderId, customerId: CustomerId) =>
      navigateToOrderDetails({ orderId, customerId }),
    [],
  );

  const ordersList = formatOrdersWithCustomerInfo(
    orderStore.orders,
    customerStore.customers,
  );

  const totalPendingEarnings = orderStore.totalPendingEarnings;

  const totalConfirmedEarnings = orderStore.totalConfirmedEarnings;

  return (
    <Orders
      list={ordersList}
      handleItemPress={handleItemPress}
      totalPendingEarnings={totalPendingEarnings}
      totalConfirmedEarnings={totalConfirmedEarnings}
    />
  );
};

export default observer(OrdersContainer);
