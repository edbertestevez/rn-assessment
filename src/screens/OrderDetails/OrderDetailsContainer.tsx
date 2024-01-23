import React from 'react';
import { Text } from 'react-native';

import OrderDetails from './OrderDetails';
import { OrderDetailsNavigationProps } from '../../navigation/AppNavigator';

const OrderDetailsContainer = ({
  route,
}: OrderDetailsNavigationProps): React.JSX.Element => {
  const { orderId } = route.params;

  if (!orderId) {
    return <Text>Invalid request</Text>;
  }

  // TODO: Handle data state first before handling this component
  return <OrderDetails />;
};

export default OrderDetailsContainer;
