import AsyncStorage from '@react-native-async-storage/async-storage';
import { observable, action, makeObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { Alert } from 'react-native';

import { CustomersAPIService } from '../api/customers';
import { Customer, CustomerId } from '../types';

interface CustomerStoreConstructor {
  initCustomers?: Customer[];
  persist?: boolean;
}

export class CustomerStore {
  customers: Customer[] = [];

  constructor({
    initCustomers = [],
    persist = false,
  }: CustomerStoreConstructor) {
    makeObservable(this, {
      customers: observable,
      getCustomers: action,
      getCustomerById: action,
    });

    // Initialize
    this.customers = initCustomers;

    if (persist) {
      makePersistable(this, {
        name: 'CustomerStore',
        properties: ['customers'],
        storage: AsyncStorage,
      });
    }
  }

  async getCustomers() {
    try {
      const data = await CustomersAPIService.getCustomers();

      runInAction(() => {
        this.customers = data;
      });
    } catch (err) {
      Alert.alert('Error fetching customers');
      console.error('Error fetching customers: ', err);
    }
  }

  getCustomerById(id: CustomerId) {
    return this.customers.find((customer) => customer.customerId === id);
  }
}

const customerStore = new CustomerStore({ initCustomers: [], persist: true });

export default customerStore;
