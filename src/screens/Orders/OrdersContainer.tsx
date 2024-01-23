import React, { useCallback, useEffect, useState } from 'react';

import Orders from './Orders';
import { OrdersAPI } from '../../services/api/orders';
import { Order } from '../../types/Order';

const OrdersContainer = (): React.JSX.Element => {
  const [data, setData] = useState<Order[]>([]);

  const getAllOrders = useCallback(async () => {
    const response = await OrdersAPI.getOrders();
    setData(response);
  }, []);

  // eslint-disable-next-line no-console
  console.log('data => ', data);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  return <Orders data={data} />;
};

export default OrdersContainer;
