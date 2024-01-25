import MockAdapter from 'axios-mock-adapter';

import { mockValidOpenOrder } from './mockOrdersApiData';

import { ordersApi, ordersApiEndpoints } from '.';

export const mockOrdersApiService = () => {
  const mock: MockAdapter = new MockAdapter(ordersApi);

  // getOrders
  mock.onGet(ordersApiEndpoints.getOrders).reply(200, [mockValidOpenOrder]);

  // Define additional endpoint mocks here

  return mock;
};
