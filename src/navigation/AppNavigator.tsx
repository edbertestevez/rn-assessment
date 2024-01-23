import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import Routes from './routes';
import OrderDetailsContainer from '../screens/OrderDetails/OrderDetailsContainer';
import OrdersContainer from '../screens/Orders/OrdersContainer';
import { CustomerId } from '../types/Customer';
import { OrderId } from '../types/Order';

// Main stack config per screen
export type StackParamList = {
  [Routes.ORDERS]: undefined;
  [Routes.ORDER_DETAILS]: { orderId: OrderId; customerId: CustomerId };
};

// Navigation props per screen
export type OrdersNavigationProps = StackScreenProps<
  StackParamList,
  Routes.ORDERS
>;

export type OrderDetailsNavigationProps = StackScreenProps<
  StackParamList,
  Routes.ORDER_DETAILS
>;

// Main Stack navigation
const Stack = createStackNavigator<StackParamList>();

const AppNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={Routes.ORDERS}>
      <Stack.Screen
        name={Routes.ORDERS}
        component={OrdersContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.ORDER_DETAILS}
        component={OrderDetailsContainer}
        options={{ title: 'Order Details' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
