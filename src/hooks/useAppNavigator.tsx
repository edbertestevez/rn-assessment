import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';

import { OrderDetailsRouteParams, StackParamList, Routes } from '../navigation';

const useAppNavigator = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const navigateToOrders = useCallback(() => {
    navigation.navigate(Routes.ORDERS);
  }, [navigation]);

  const navigateToOrderDetails = useCallback(
    ({ orderId, customerId }: OrderDetailsRouteParams) => {
      navigation.navigate(Routes.ORDER_DETAILS, { orderId, customerId });
    },
    [navigation],
  );

  return {
    navigateToOrders,
    navigateToOrderDetails,
  };
};

export default useAppNavigator;
