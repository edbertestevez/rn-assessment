import { OrderStore } from './OrderStore';
import {
  mockInvalidOrder,
  mockOrders,
  mockValidCloseOrder,
  mockValidOpenOrder,
} from '../testUtils';
import { OrderStatus } from '../types/Order';

it('initializes orders correctly', () => {
  const orderStore = new OrderStore({ initOrders: mockOrders });
  expect(orderStore.orders).toHaveLength(3);
});

it('getOrders', () => {
  // TODO: Mock getOrders api calls
});

it('getOrderById', () => {
  const orderStore = new OrderStore({
    initOrders: [mockValidCloseOrder, mockValidOpenOrder],
  });
  const order = orderStore.getOrderById(mockValidCloseOrder.orderId);

  expect(order).toEqual(mockValidCloseOrder);
});

it('closeOrderById', async () => {
  const orderStore = new OrderStore({
    initOrders: [mockValidOpenOrder, mockInvalidOrder],
  });
  await orderStore.closeOrderById(mockValidOpenOrder.orderId);

  // Verify if status changed
  const updatedOrder = orderStore.getOrderById(mockValidOpenOrder.orderId);
  expect(updatedOrder?.status).toEqual(OrderStatus.CLOSE);

  // Verify other orders that are open are not affected
  const openOrder = orderStore.getOrderById(mockInvalidOrder.orderId);
  expect(openOrder?.status).toEqual(OrderStatus.OPEN);
});

it('totalPendingEarnings and totalConfirmedEarnings', () => {
  const mockDefaultInfo = {
    timestamp: '',
    customerId: 1,
    items: [],
  };

  const orderStore = new OrderStore({
    initOrders: [
      {
        orderId: 1,
        status: OrderStatus.OPEN,
        totalPrice: 10, // earning = 10
        taxFree: true,
        ...mockDefaultInfo,
      },
      {
        orderId: 2,
        status: OrderStatus.OPEN,
        totalPrice: 50, // earning = 39.5
        taxFree: false,
        ...mockDefaultInfo,
      },
      {
        orderId: 3,
        status: OrderStatus.CLOSE,
        totalPrice: 80, // earning = 80
        taxFree: true,
        ...mockDefaultInfo,
      },
      {
        orderId: 4,
        status: OrderStatus.CLOSE,
        totalPrice: 75, // earning = 59.25
        taxFree: false,
        ...mockDefaultInfo,
      },
    ],
  });

  // Total pending earnings
  expect(orderStore.totalPendingEarnings).toEqual(49.5);

  // Total confirmed earnings
  expect(orderStore.totalConfirmedEarnings).toEqual(139.25);
});
