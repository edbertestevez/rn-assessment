import { Customer, Order, OrderWithCustomerInfo } from '../types';

export const formatOrdersWithCustomerInfo = (
  orders: Order[] = [],
  customers: Customer[] = [],
) => {
  const formattedData = orders.reduce(
    (acc: OrderWithCustomerInfo[], currOrder: Order) => {
      const customer = customers.find(
        (currCustomer) => currCustomer.customerId === currOrder.customerId,
      );

      return acc.concat({
        ...currOrder,
        customerName: customer?.customerName ?? 'Unknown',
      });
    },
    [],
  );

  return formattedData;
};
