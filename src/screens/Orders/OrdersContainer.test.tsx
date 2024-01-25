import React from 'react';

import OrdersContainer from './OrdersContainer';
import { mockOrders } from '../../api/orders';
import orderStore from '../../stores/OrderStore';
import { TestIds, render } from '../../testUtils';

it('Displays correct default confirmed and pending earnings', async () => {
  // Set test data for calculation
  await orderStore.setOrders(mockOrders);

  const { getByTestId } = render(<OrdersContainer />);

  expect(getByTestId(TestIds.ORDERS_CONFIRMED_EARNINGS)).toHaveTextContent(
    '$20.11',
  );

  expect(getByTestId(TestIds.ORDERS_PENDING_EARNINGS)).toHaveTextContent(
    '$48.94',
  );
});
