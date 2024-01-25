import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { Alert, Text } from 'react-native';
import RTNTimer from 'rtn-timer/js/NativeTimer';

import OrderDetails from './OrderDetails';
import { PREPARE_TIME_SECONDS } from '../../config';
import { OrderDetailsStackScreenProps } from '../../navigation';
import customerStore from '../../stores/CustomerStore';
import orderStore from '../../stores/OrderStore';
import { OrderStatus } from '../../types';

const OrderDetailsContainer = ({
  route,
}: OrderDetailsStackScreenProps): React.JSX.Element => {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const { orderId, customerId } = route.params;

  const orderData = orderStore.getOrderById(orderId);
  const customerData = customerStore.getCustomerById(customerId);

  const isOpen = orderData?.status === OrderStatus.OPEN;
  const isPreparing = orderStore.preparingOrderIds.includes(orderId);

  const handlePrepareOrder = useCallback(async () => {
    if (RTNTimer?.runNativeTimer && orderData) {
      // Add to list of orderIds being prepared
      orderStore.prepareOrderById(orderId);

      // Native module timer
      await RTNTimer?.runNativeTimer(PREPARE_TIME_SECONDS);

      // Set to expired if status is not updated to close
      if (orderData?.status !== OrderStatus.CLOSE) {
        orderStore.expireOrderById(orderId);
      }
    } else {
      Alert.alert('Your request cannot be processed at the moment');
    }
  }, [orderId, orderData]);

  const handleCloseOrder = useCallback(() => {
    setIsClosing(true);
    orderStore.closeOrderById(orderId);
    setIsClosing(false);
  }, [orderId]);

  if (!orderData || !customerData) {
    return <Text>Invalid request</Text>;
  }

  return (
    <OrderDetails
      order={orderData}
      customer={customerData}
      onCloseOrder={handleCloseOrder}
      onPrepareOrder={handlePrepareOrder}
      isClosing={isClosing}
      isPreparing={isPreparing}
      isOpen={isOpen}
    />
  );
};

export default observer(OrderDetailsContainer);
