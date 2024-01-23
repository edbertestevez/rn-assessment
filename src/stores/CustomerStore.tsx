import { observable, action, makeObservable, runInAction } from 'mobx';

import { OrdersAPI } from '../services/api/orders';
import { Customer, CustomerId } from '../types/Customer';

class CustomerStore {
  customers: Customer[] = [];

  constructor() {
    makeObservable(this, {
      customers: observable,
      getCustomers: action,
      getCustomerById: action,
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

  getCustomerById(id: CustomerId) {
    return this.customers.find((customer) => customer.customerId === id);
  }
}

const customerStore = new CustomerStore();

export default customerStore;
