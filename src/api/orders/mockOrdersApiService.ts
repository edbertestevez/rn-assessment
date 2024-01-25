import MockAdapter from 'axios-mock-adapter';

import { mockValidCloseOrder, mockValidOpenOrder } from './mockOrdersApiData';

import { ordersApi, ordersApiEndpoints } from '.';

export const mockOrdersApiService = () => {
  const mock: MockAdapter = new MockAdapter(ordersApi);

  // getOrders (2 records)
  mock
    .onGet(ordersApiEndpoints.getOrders)
    .reply(200, [mockValidOpenOrder, mockValidCloseOrder]);

  // Define additional endpoint mocks here

  return mock;
};
