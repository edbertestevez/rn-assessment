import React from 'react';
import { Text } from 'react-native';

import OrderDetails from './OrderDetails';
import { OrderDetailsNavigationProps } from '../../navigation/AppNavigator';
import customerStore from '../../stores/CustomerStore.tsx';
import orderStore from '../../stores/OrderStore.tsx';

const OrderDetailsContainer = ({
  route,
}: OrderDetailsNavigationProps): React.JSX.Element => {
  const { orderId, customerId } = route.params;

  const orderData = orderStore.getOrderById(orderId);
  const customerData = customerStore.getCustomerById(customerId);

  if (!orderData || !customerData) {
    return <Text>Invalid request</Text>;
  }

  return <OrderDetails order={orderData} customer={customerData} />;
};

export default OrderDetailsContainer;
