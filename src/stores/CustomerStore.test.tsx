import MockAdapter from 'axios-mock-adapter';
import { Alert } from 'react-native';

import { CustomerStore } from './CustomerStore';
import {
  customersApi,
  customersApiEndpoints,
  mockCustomers,
  mockValidCustomer101,
  mockValidCustomer102,
} from '../api/customers';

/**
 * API Calls are mocked in testUtils/testingLibraryUtils.tsx
 */

it('initializes orders correctly', () => {
  const customerStore = new CustomerStore({ initCustomers: mockCustomers });
  expect(customerStore.customers).toHaveLength(4);
});

it('getCustomers', async () => {
  const customerStore = new CustomerStore({});
  await customerStore.getCustomers();
  expect(customerStore.customers.length).toEqual(2);
});

it('getCustomers error alert', async () => {
  // Custom adapter for getOrders
  const mockIntercept = new MockAdapter(customersApi);
  mockIntercept.onGet(customersApiEndpoints.getCustomers).reply(500);

  // Spy on alert
  jest.spyOn(Alert, 'alert');

  // Proceed with request
  const customerStore = new CustomerStore({});
  await customerStore.getCustomers();

  // Alert message should be displayed
  expect(Alert.alert).toHaveBeenCalledWith('Error fetching customers');

  // No customer in store
  expect(customerStore.customers.length).toEqual(0);
});

it('getCustomerById', () => {
  const customerStore = new CustomerStore({
    initCustomers: [mockValidCustomer101, mockValidCustomer102],
  });

  const customer = customerStore.getCustomerById(
    mockValidCustomer102.customerId,
  );

  expect(customer).toEqual(mockValidCustomer102);
});
