import api from './config/axiosConfig';
import endpoints from './endpoints';
import { Customer } from '../../../types/Customer';
import { Order } from '../../../types/Order';

interface OrdersAPIService {
  getOrders: () => Promise<Order[]>;
  getCustomers: () => Promise<Customer[]>;
}

type GetOrdersResponseData = Order[];
type GetCustomersResponseData = { customers: Customer[] };

export const OrdersAPI: OrdersAPIService = {
  getOrders: async () => {
    const response = await api.get<GetOrdersResponseData>(endpoints.getOrders);
    return response.data;
  },
  getCustomers: async () => {
    const response = await api.get<GetCustomersResponseData>(
      endpoints.getCustomers,
    );
    return response.data.customers;
  },
  // Add other orders api here
};
