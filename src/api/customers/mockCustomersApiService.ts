import MockAdapter from 'axios-mock-adapter';

import {
  mockValidCustomer101,
  mockValidCustomer102,
} from './mockCustomersApiData';

import { customersApi, customersApiEndpoints } from '.';

export const mockCustomersApiService = () => {
  // IMPORTANT: The axios instance should be mocked so all requests will not proceed on actual API
  const mock: MockAdapter = new MockAdapter(customersApi);

  // getCustomers
  mock
    .onGet(customersApiEndpoints.getCustomers)
    .reply(200, { customers: [mockValidCustomer101, mockValidCustomer102] });

  return mock;
};
