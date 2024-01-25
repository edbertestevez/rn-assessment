import React from 'react';

import Orders from './Orders';
import { mockCustomers } from '../../api/customers';
import { mockOrders } from '../../api/orders';
import { formatOrdersWithCustomerInfo } from '../../helpers/format';
import { render, cleanup, fireEvent, TestIds } from '../../testUtils';

const mockList = formatOrdersWithCustomerInfo(mockOrders, mockCustomers);

// Cleanup after each test
afterEach(cleanup);

it('renders correctly and displays correct number of order in the list', () => {
  const { getByText, getAllByTestId } = render(
    <Orders
      list={mockList}
      handleItemPress={jest.fn()}
      totalPendingEarnings={0}
      totalConfirmedEarnings={0}
    />,
  );

  // Header should be present
  expect(getByText('Order Portal')).toBeTruthy();

  // Should render 4 orders in the list
  expect(getAllByTestId(TestIds.ORDER_ITEMS)).toHaveLength(3);
});

// Order ID, customer name, and status should be visible on screen
it('renders correct order and customer information', () => {
  const { getByText } = render(
    <Orders
      list={mockList}
      handleItemPress={jest.fn()}
      totalPendingEarnings={0}
      totalConfirmedEarnings={0}
    />,
  );

  // Order #1 is present with correct information
  expect(getByText('# 1')).toBeTruthy();
  expect(getByText('John Doe (101)')).toBeTruthy();

  // Order #2 is present with correct information
  expect(getByText('# 2')).toBeTruthy();
  expect(getByText('Jane Smith (102)')).toBeTruthy();

  // Order #3 is present with correct information ('Unkown' customer)
  expect(getByText('# 3')).toBeTruthy();
  expect(getByText('Unknown (999)')).toBeTruthy();
});

it('handles item press correctly', () => {
  const mockItemPress = jest.fn();

  const { getAllByTestId } = render(
    <Orders
      list={mockList}
      handleItemPress={mockItemPress}
      totalPendingEarnings={0}
      totalConfirmedEarnings={0}
    />,
  );

  fireEvent.press(getAllByTestId(TestIds.ORDER_ITEMS)?.[0]);

  // Clicking on 1st instance should call defined function with correct order ID and customer ID
  expect(mockItemPress).toHaveBeenCalledTimes(1);
  expect(mockItemPress).toHaveBeenCalledWith(1, 101);
});
