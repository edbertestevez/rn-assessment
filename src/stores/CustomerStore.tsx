import { observable, action, makeObservable, runInAction } from 'mobx';

import { OrdersAPI } from '../services/api/orders';
import { Customer } from '../types/Customer';

class CustomerStore {
  customers: Customer[] = [];

  constructor() {
    makeObservable(this, {
      customers: observable,
      getCustomers: action,
    });
  }

  async getCustomers() {
    try {
      const data = await OrdersAPI.getCustomers();

      runInAction(() => {
        this.customers = data;
      });
    } catch (err) {
      console.error('Error fetching customers: ', err);
    }
  }
}

const customerStore = new CustomerStore();

export default customerStore;
