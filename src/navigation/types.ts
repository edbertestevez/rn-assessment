import { StackScreenProps } from '@react-navigation/stack';
import { CustomerId } from '../types/Customer';
import { OrderId } from '../types/Order';
import Routes from './routes';

export type OrderDetailsRouteParams = {
  orderId: OrderId;
  customerId: CustomerId;
};

// Main stack config per screen
export type StackParamList = {
  [Routes.ORDERS]: undefined;
  [Routes.ORDER_DETAILS]: OrderDetailsRouteParams;
};

// Navigation props per screen
export type OrdersStackScreenProps = StackScreenProps<
  StackParamList,
  Routes.ORDERS
>;

export type OrderDetailsStackScreenProps = StackScreenProps<
  StackParamList,
  Routes.ORDER_DETAILS
>;
