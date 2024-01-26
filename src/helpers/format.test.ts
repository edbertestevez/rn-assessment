import { formatOrdersWithCustomerInfo } from './format';
import { mockCustomers } from '../api/customers';
import { Order, OrderStatus } from '../types';

describe('formatOrdersWithCustomerInfo test cases', () => {
  it('returns formatted order with valid and existing customer', () => {
    const additionalInfo: Omit<Order, 'orderId' | 'customerId'> = {
      items: [
        {
          itemId: 101,
          itemName: 'Cheeseburger',
          quantity: 2,
          price: 9.99,
        },
      ],
      totalPrice: 19.98,
      taxFree: false,
      status: OrderStatus.CLOSE,
      timestamp: '2023-09-20T12:30:45Z',
    };

    const orders = [
      // Valid customerId
      {
        orderId: 1,
        customerId: 101,
        ...additionalInfo,
      },
      // Invalid customerId
      {
        orderId: 2,
        customerId: 999,
        ...additionalInfo,
      },
    ];

    const customers = mockCustomers;

    const response = formatOrdersWithCustomerInfo(orders, customers);

    // Correct length of orders after formatting
    expect(response).toHaveLength(2);

    const orderWithValidCustomer = response[0];
    const orderWithInvalidCustomer = response[1];

    // Should have customer name included in the response if customer is found
    expect(orderWithValidCustomer).toEqual({
      ...orders[0],
      customerName: 'John Doe',
    });

    // Should return 'Unknown' customer name in the response if customer is not found
    expect(orderWithInvalidCustomer).toEqual({
      ...orders[1],
      customerName: 'Unknown',
    });
  });
});
