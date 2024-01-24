import { CustomerStore } from './CustomerStore';
import {
  mockCustomers,
  mockValidCustomer101,
  mockValidCustomer102,
} from '../utils/mockData';

it('initializes orders correctly', () => {
  const customerStore = new CustomerStore({ initCustomers: mockCustomers });
  expect(customerStore.customers).toHaveLength(4);
});

it('getCustomers', () => {
  // TODO: Mock getCustomers api calls
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
