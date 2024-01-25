import { CustomerStore } from './CustomerStore';
import {
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

it('getCustomerById', () => {
  const customerStore = new CustomerStore({
    initCustomers: [mockValidCustomer101, mockValidCustomer102],
  });

  const customer = customerStore.getCustomerById(
    mockValidCustomer102.customerId,
  );

  expect(customer).toEqual(mockValidCustomer102);
});
