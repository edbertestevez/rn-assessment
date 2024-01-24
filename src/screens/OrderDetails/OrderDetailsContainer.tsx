import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { Alert, Text } from 'react-native';
import RTNTimer from 'rtn-timer/js/NativeTimer';

import OrderDetails from './OrderDetails';
import { OrderDetailsStackScreenProps } from '../../navigation';
import customerStore from '../../stores/CustomerStore.tsx';
import orderStore from '../../stores/OrderStore.tsx';
import { OrderStatus } from '../../types/Order.ts';

// TODO: Transfer to a config file
const PREPARE_TIME_SECONDS = 10;

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
    if (RTNTimer?.runNativeTimer) {
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
  }, [orderId, orderData?.status]);

  const handleCloseOrder = useCallback(() => {
    setIsClosing(true);

    // This is just to simulate an actual loading while processing
    setTimeout(() => {
      orderStore.closeOrderById(orderId);
      setIsClosing(false);
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
      onPrepareOrder={handlePrepareOrder}
      isClosing={isClosing}
      isPreparing={isPreparing}
      isOpen={isOpen}
    />
  );
};

export default observer(OrderDetailsContainer);
