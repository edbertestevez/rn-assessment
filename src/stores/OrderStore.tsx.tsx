import { observable, action, makeObservable, runInAction } from 'mobx';

import { OrdersAPI } from '../services/api/orders';
import { Order } from '../types/Order';

class OrderStore {
  orders: Order[] = [];

  constructor() {
    makeObservable(this, {
      orders: observable,
      getOrders: action,
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
}

const orderStore = new OrderStore();

export default orderStore;
