import MockAdapter from 'axios-mock-adapter';

import { actualOrdersWithTotalPriceFix } from './mockOrdersApiData';
import { ordersApiEndpoints } from './ordersApiEndpoints';
import { Order } from '../../types';
import { createApiInstance } from '../config';

interface OrdersAPIServiceProps {
  getOrders: () => Promise<Order[]>;
}

type GetOrdersResponseData = Order[];

export const ordersApi = createApiInstance({});

const mock: MockAdapter = new MockAdapter(ordersApi);

// TEMP: Intercepted actual API to have the correct totalPrice data for Orders #1 & #4
mock
  .onGet(ordersApiEndpoints.getOrders)
  .reply(200, actualOrdersWithTotalPriceFix);

export const OrdersAPIService: OrdersAPIServiceProps = {
  getOrders: async () => {
    const response = await ordersApi.get<GetOrdersResponseData>(
      ordersApiEndpoints.getOrders,
    );
    return response.data;
  },
  // Add other orders api here
};
