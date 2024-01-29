import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Routes from './routes';
import { StackParamList } from './types';
import OrderDetailsContainer from '../screens/OrderDetails/OrderDetailsContainer';
import OrdersContainer from '../screens/Orders/OrdersContainer';
import { TestIds } from '../testUtils';

// Main Stack navigation
const Stack = createStackNavigator<StackParamList>();

const AppNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.ORDERS}
      screenOptions={{ headerBackTestID: TestIds.NAVIGATION_BACK }}
    >
      <Stack.Screen
        name={Routes.ORDERS}
        component={OrdersContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.ORDER_DETAILS}
        component={OrderDetailsContainer}
        options={{ title: 'Order Details', headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
