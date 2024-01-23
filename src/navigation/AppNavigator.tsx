import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Routes from './routes';
import OrdersContainer from '../screens/Orders/OrdersContainer';

const Stack = createStackNavigator();

const AppNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.ORDERS}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={Routes.ORDERS} component={OrdersContainer} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
