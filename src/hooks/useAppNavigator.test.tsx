import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Button } from 'react-native';

import useAppNavigator from './useAppNavigator';
import { Routes } from '../navigation';

// Mock the useNavigation.navigate
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const TestComponent: React.FC = () => {
  const { navigateToOrders, navigateToOrderDetails } = useAppNavigator();

  return (
    <>
      <Button onPress={navigateToOrders} title="Navigate to Orders" />
      <Button
        onPress={() => navigateToOrderDetails({ orderId: 1, customerId: 1 })}
        title="Navigate to Order Details"
      />
    </>
  );
};

it('Should navigate to Orders', () => {
  const { getByRole } = render(
    <NavigationContainer>
      <TestComponent />
    </NavigationContainer>,
  );

  fireEvent.press(getByRole('button', { name: 'Navigate to Orders' }));

  expect(mockNavigate).toHaveBeenCalledWith(Routes.ORDERS);
});

it('Should navigate to Order Details', () => {
  const { getByText } = render(
    <NavigationContainer>
      <TestComponent />
    </NavigationContainer>,
  );

  fireEvent.press(getByText('Navigate to Order Details'));

  expect(mockNavigate).toHaveBeenCalledWith(Routes.ORDER_DETAILS, {
    orderId: 1,
    customerId: 1,
  });
});
