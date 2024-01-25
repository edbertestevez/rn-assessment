import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  observable,
  action,
  makeObservable,
  runInAction,
  computed,
} from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { OrdersAPIService } from '../api/orders';
import { Order, OrderId, OrderStatus } from '../types';
import { getPercentageValue } from '../utils';

interface OrderStoreConstructor {
  initOrders?: Order[];
  persist?: boolean;
}

export class OrderStore {
  orders: Order[] = [];
  closedOrderIds: OrderId[] = [];
  expiredOrderIds: OrderId[] = [];
  preparingOrderIds: OrderId[] = [];

  // Persist was added to not persist data on mock testing
  constructor({ initOrders = [], persist = false }: OrderStoreConstructor) {
    makeObservable(this, {
      orders: observable,
      closedOrderIds: observable,
      expiredOrderIds: observable,
      preparingOrderIds: observable,
      clearStoredIds: action,
      getOrders: action,
      getOrderById: action,
      closeOrderById: action,
      expireOrderById: action,
      prepareOrderById: action,
      totalPendingEarnings: computed,
      totalConfirmedEarnings: computed,
    });

    // Initialize
    this.orders = initOrders;

    if (persist) {
      makePersistable(this, {
        name: 'OrderStore',
        properties: ['orders', 'closedOrderIds', 'expiredOrderIds'],
        storage: AsyncStorage,
      });
    }
  }

  async getOrders() {
    try {
      const data = await OrdersAPIService.getOrders();

      runInAction(() => {
        // Validate with AsyncStorage if orderId is part of closed orders, then set to Close
        this.orders = data.map((order) => ({
          ...order,
          status: this.formatStatus(order.orderId),
        }));
      });
    } catch (err) {
      console.error('Error fetching orders: ', err);
    }
  }

  formatStatus(id: OrderId): OrderStatus {
    if (this.closedOrderIds.includes(id)) {
      return OrderStatus.CLOSE;
    }

    if (this.expiredOrderIds.includes(id)) {
      return OrderStatus.EXPIRED;
    }

    return OrderStatus.OPEN;
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

  expireOrderById(id: OrderId) {
    this.orders.map((order) => {
      if (order.orderId === id) {
        order.status = OrderStatus.EXPIRED;
      }

      return order;
    });

    this.expiredOrderIds = this.expiredOrderIds.concat(id);
  }

  prepareOrderById(id: OrderId) {
    this.preparingOrderIds = this.preparingOrderIds.concat(id);
  }

  get totalPendingEarnings(): number {
    return this.orders.reduce((total: number, order: Order) => {
      if (order.status !== OrderStatus.OPEN) {
        return total;
      }

      if (order.taxFree) {
        return total + order.totalPrice;
      }

      const percentageValue = getPercentageValue({
        percentage: 21,
        value: order.totalPrice,
      });

      return total + (order.totalPrice - percentageValue);
    }, 0);
  }

  get totalConfirmedEarnings(): number {
    return this.orders.reduce((total: number, order: Order) => {
      if (order.status !== OrderStatus.CLOSE) {
        return total;
      }

      if (order.taxFree) {
        return total + order.totalPrice;
      }

      const percentageValue = getPercentageValue({
        percentage: 21,
        value: order.totalPrice,
      });

      return total + (order.totalPrice - percentageValue);
    }, 0);
  }

  clearStoredIds(): void {
    this.expiredOrderIds = [];
    this.closedOrderIds = [];
    this.preparingOrderIds = [];
  }
}

const orderStore = new OrderStore({
  initOrders: [],
  persist: true,
});

export default orderStore;
