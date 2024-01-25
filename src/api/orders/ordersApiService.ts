import { Order } from '../../types';
import { createApiInstance } from '../config';

import { ordersApiEndpoints } from '.';

interface OrdersAPIServiceProps {
  getOrders: () => Promise<Order[]>;
}

type GetOrdersResponseData = Order[];

export const ordersApi = createApiInstance({});

export const OrdersAPIService: OrdersAPIServiceProps = {
  getOrders: async () => {
    const response = await ordersApi.get<GetOrdersResponseData>(
      ordersApiEndpoints.getOrders,
    );
    return response.data;
  },
  // Add other orders api here
};
