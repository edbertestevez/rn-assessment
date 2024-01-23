import api from './config/axiosConfig';
import endpoints from './endpoints';
import { Order } from '../../../types/Order';

interface IOrdersAPI {
  getOrders: () => Promise<Order[]>;
}

export const OrdersAPI: IOrdersAPI = {
  getOrders: async () => {
    const response = await api.get<Order[]>(endpoints.getOrders);
    return response.data;
  },
  // Add other orders api here
};
