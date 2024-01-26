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
  totalPrice: 27.45, // earnings 21.69 (FIXED data)
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
  totalPrice: 12.99, // earnings 12.99
  taxFree: true,
  status: OrderStatus.OPEN,
  timestamp: '2023-09-20T13:15:20Z',
};

export const mockOrders: Order[] = [
  mockValidCloseOrder,
  mockValidOpenOrder,
  mockInvalidOrder,
];

// TEMP: Corrected response from API with matching expected totalPrice
export const actualOrdersWithTotalPriceFix: Order[] = [
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
    totalPrice: 27.45, // FIXED (previous is 27.45)
    taxFree: false, // FIXED earning is 21.69
    status: OrderStatus.OPEN,
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
  {
    orderId: 3,
    customerId: 103,
    items: [
      {
        itemId: 107,
        itemName: 'Chicken Sandwich',
        quantity: 2,
        price: 8.99,
      },
      {
        itemId: 108,
        itemName: 'Onion Rings',
        quantity: 1,
        price: 4.49,
      },
    ],
    totalPrice: 22.47,
    taxFree: false,
    status: OrderStatus.OPEN,
    timestamp: '2023-09-20T14:45:10Z',
  },
  {
    orderId: 4,
    customerId: 104,
    items: [
      {
        itemId: 109,
        itemName: 'Spaghetti',
        quantity: 1,
        price: 11.99,
      },
      {
        itemId: 110,
        itemName: 'Caesar Salad',
        quantity: 1,
        price: 7.99,
      },
      {
        itemId: 111,
        itemName: 'Iced Tea',
        quantity: 2,
        price: 2.49,
      },
    ],
    totalPrice: 24.96, // FIXED
    taxFree: true,
    status: OrderStatus.OPEN,
    timestamp: '2023-09-20T15:20:55Z',
  },
];
