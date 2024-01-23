import { Customer } from '../types/Customer';
import { Order, OrderStatus } from '../types/Order';

export const mockOrders: Order[] = [
  {
    orderId: 1,
    customerId: 101,
    items: [
      {
        itemId: 101,
        itemName: 'Cheeseburger',
        quantity: 2,
        price: 9.99,
      },
      {
        itemId: 102,
        itemName: 'French Fries',
        quantity: 1,
        price: 3.49,
      },
      {
        itemId: 103,
        itemName: 'Soda',
        quantity: 2,
        price: 1.99,
      },
    ],
    totalPrice: 25.46,
    taxFree: false,
    status: OrderStatus.CLOSE,
    timestamp: '2023-09-20T12:30:45Z',
  },
  {
    orderId: 2,
    customerId: 102,
    items: [
      {
        itemId: 104,
        itemName: 'Pizza',
        quantity: 1,
        price: 12.99,
      },
      {
        itemId: 105,
        itemName: 'Garlic Bread',
        quantity: 1,
        price: 4.99,
      },
      {
        itemId: 106,
        itemName: 'Salad',
        quantity: 1,
        price: 6.49,
      },
    ],
    totalPrice: 24.47,
    taxFree: true,
    status: OrderStatus.OPEN,
    timestamp: '2023-09-20T13:15:20Z',
  },
];

export const mockCustomers: Customer[] = [
  {
    customerId: 101,
    customerName: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main Street',
  },
  {
    customerId: 102,
    customerName: 'Jane Smith',
    email: 'janesmith@example.com',
    phone: '987-654-3210',
    address: '456 Elm Avenue',
  },
  {
    customerId: 103,
    customerName: 'Mike Johnson',
    email: 'mikejohnson@example.com',
    phone: '555-123-4567',
    address: '789 Oak Road',
  },
  {
    customerId: 104,
    customerName: 'Sarah Lee',
    email: 'sarahlee@example.com',
    phone: '111-222-3333',
    address: '321 Maple Lane',
  },
];
