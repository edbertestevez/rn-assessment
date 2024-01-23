import api from './config/axiosConfig';
import endpoints from './endpoints';
import { Customer } from '../../../types/Customer';
import { Order } from '../../../types/Order';

interface IOrdersAPI {
  getOrders: () => Promise<Order[]>;
  getCustomers: () => Promise<Customer[]>;
}

export const OrdersAPI: IOrdersAPI = {
  getOrders: async () => {
    const response = await api.get<Order[]>(endpoints.getOrders);
    return response.data;
  },
  getCustomers: async () => {
    const response = await api.get<Customer[]>(endpoints.getCustomers);
    return response.data;
  },
  // Add other orders api here
};
