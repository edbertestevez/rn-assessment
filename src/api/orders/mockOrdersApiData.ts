import { Order, OrderStatus } from '../../types';

export const mockValidCloseOrder = {
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
  totalPrice: 25.46, // earnings 20.11
  taxFree: false,
  status: OrderStatus.CLOSE,
  timestamp: '2023-09-20T12:30:45Z',
};

export const mockValidOpenOrder = {
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
  totalPrice: 24.47, // earnings 24.47
  taxFree: true,
  status: OrderStatus.OPEN,
  timestamp: '2023-09-20T13:15:20Z',
};

// Invalid customer
export const mockInvalidOrder = {
  orderId: 3,
  customerId: 999,
  items: [
    {
      itemId: 104,
      itemName: 'Pizza',
      quantity: 1,
      price: 12.99,
    },
  ],
  totalPrice: 24.47, // earnings 24.47
  taxFree: true,
  status: OrderStatus.OPEN,
  timestamp: '2023-09-20T13:15:20Z',
};

export const mockOrders: Order[] = [
  mockValidCloseOrder,
  mockValidOpenOrder,
  mockInvalidOrder,
];
