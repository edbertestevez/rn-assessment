import { observable, action, makeObservable, runInAction } from 'mobx';

import { OrdersAPI } from '../services/api/orders';
import { Order, OrderId, OrderStatus } from '../types/Order';

class OrderStore {
  orders: Order[] = [];

  constructor() {
    makeObservable(this, {
      orders: observable,
      getOrders: action,
      getOrderById: action,
      closeOrderById: action,
    });
  }

  async getOrders() {
    try {
      const data = await OrdersAPI.getOrders();

      runInAction(() => {
        this.orders = data;
      });
    } catch (err) {
      console.error('Error fetching orders: ', err);
    }
  }

  getOrderById(id: OrderId) {
    return this.orders.find((order) => order.orderId === id);
  }

  closeOrderById(id: OrderId) {
    this.orders.map((order) => {
      if (order.orderId === id) {
        order.status = OrderStatus.CLOSE;
      }

      return order;
    });
  }
}

const orderStore = new OrderStore();

export default orderStore;
