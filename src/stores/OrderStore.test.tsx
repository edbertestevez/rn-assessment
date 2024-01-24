import { OrderStore } from './OrderStore';
import { OrderStatus } from '../types/Order';
import {
  mockInvalidOrder,
  mockOrders,
  mockValidCloseOrder,
  mockValidOpenOrder,
} from '../utils/mockData';

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
