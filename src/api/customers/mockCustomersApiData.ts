import { Customer } from '../../types';

export const mockValidCustomer101 = {
  customerId: 101,
  customerName: 'John Doe',
  email: 'johndoe@example.com',
  phone: '123-456-7890',
  address: '123 Main Street',
};

export const mockValidCustomer102 = {
  customerId: 102,
  customerName: 'Jane Smith',
  email: 'janesmith@example.com',
  phone: '987-654-3210',
  address: '456 Elm Avenue',
};

export const mockValidCustomer103 = {
  customerId: 103,
  customerName: 'Mike Johnson',
  email: 'mikejohnson@example.com',
  phone: '555-123-4567',
  address: '789 Oak Road',
};

export const mockValidCustomer104 = {
  customerId: 104,
  customerName: 'Sarah Lee',
  email: 'sarahlee@example.com',
  phone: '111-222-3333',
  address: '321 Maple Lane',
};

export const mockCustomers: Customer[] = [
  mockValidCustomer101,
  mockValidCustomer102,
  mockValidCustomer103,
  mockValidCustomer104,
];
