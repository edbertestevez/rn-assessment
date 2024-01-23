import React, { useCallback, useEffect, useState } from 'react';

import Orders from './Orders';
import { OrdersNavigationProps } from '../../navigation/AppNavigator';
import Routes from '../../navigation/routes';
import { OrdersAPI } from '../../services/api/orders';
import { Order, OrderId } from '../../types/Order';

const OrdersContainer = ({
  navigation,
}: OrdersNavigationProps): React.JSX.Element => {
  const [data, setData] = useState<Order[]>([]);

  const getAllOrders = useCallback(async () => {
    const response = await OrdersAPI.getOrders();
    setData(response);
  }, []);

  const handleItemPress = useCallback(
    (orderId: OrderId) =>
      navigation.navigate(Routes.ORDER_DETAILS, { orderId }),
    [navigation],
  );

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  return <Orders data={data} handleItemPress={handleItemPress} />;
};

export default OrdersContainer;
