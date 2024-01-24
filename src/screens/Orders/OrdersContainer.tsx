import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';

import Orders from './Orders';
import { formatOrdersWithCustomerInfo } from '../../helpers/format.ts';
import { OrdersNavigationProps } from '../../navigation/AppNavigator';
import Routes from '../../navigation/routes';
import customerStore from '../../stores/CustomerStore.tsx';
import orderStore from '../../stores/OrderStore.tsx';
import { CustomerId } from '../../types/Customer.ts';
import { OrderId } from '../../types/Order';

const OrdersContainer = ({
  navigation,
}: OrdersNavigationProps): React.JSX.Element => {
  const handleItemPress = useCallback(
    (orderId: OrderId, customerId: CustomerId) =>
      navigation.navigate(Routes.ORDER_DETAILS, { orderId, customerId }),
    [navigation],
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
