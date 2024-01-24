import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import RTNTimer from 'rtn-timer/js/NativeTimer';

import OrderDetails from './OrderDetails';
import { OrderDetailsNavigationProps } from '../../navigation/AppNavigator';
import customerStore from '../../stores/CustomerStore.tsx';
import orderStore from '../../stores/OrderStore.tsx';
import { OrderStatus } from '../../types/Order.ts';
const OrderDetailsContainer = ({
  route,
}: OrderDetailsNavigationProps): React.JSX.Element => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const { orderId, customerId } = route.params;

  const orderData = orderStore.getOrderById(orderId);
  const customerData = customerStore.getCustomerById(customerId);
  const isOpen = orderData?.status === OrderStatus.OPEN;

  const handleCloseOrder = useCallback(() => {
    setIsProcessing(true);

    // This is just to simulate an actual loading while processing
    setTimeout(() => {
      orderStore.closeOrderById(orderId);
      setIsProcessing(false);
    }, 1000);
  }, [orderId]);

  if (!orderData || !customerData) {
    return <Text>Invalid request</Text>;
  }

  return (
    <OrderDetails
      order={orderData}
      customer={customerData}
      onCloseOrder={handleCloseOrder}
      isProcessing={isProcessing}
      isOpen={isOpen}
    />
  );
};

export default observer(OrderDetailsContainer);
