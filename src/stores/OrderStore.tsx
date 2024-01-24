import AsyncStorage from '@react-native-async-storage/async-storage';
import { observable, action, makeObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { OrdersAPI } from '../services/api/orders';
import { Order, OrderId, OrderStatus } from '../types/Order';

interface OrderStoreConstructor {
  initOrders?: Order[];
  persist?: boolean;
}

export class OrderStore {
  orders: Order[] = [];
  closedOrderIds: OrderId[] = [];

  // Persist was added to not persist data on mock testing
  constructor({ initOrders = [], persist = false }: OrderStoreConstructor) {
    makeObservable(this, {
      orders: observable,
      closedOrderIds: observable,
      getOrders: action,
      getOrderById: action,
      closeOrderById: action,
    });

    // Initialize
    this.orders = initOrders;

    if (persist) {
      makePersistable(this, {
        name: 'OrderStore',
        properties: ['orders', 'closedOrderIds'],
        storage: AsyncStorage,
      });
    }
  }

  async getOrders() {
    try {
      const data = await OrdersAPI.getOrders();

      runInAction(() => {
        // Validate with AsyncStorage if orderId is part of closed orders, then set to Close
        this.orders = data.map((order) => ({
          ...order,
          status: this.closedOrderIds.includes(order.orderId)
            ? OrderStatus.CLOSE
            : OrderStatus.OPEN,
        }));
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

    this.closedOrderIds = this.closedOrderIds.concat(id);
  }
}

const orderStore = new OrderStore({
  initOrders: [],
  persist: true,
});

export default orderStore;
