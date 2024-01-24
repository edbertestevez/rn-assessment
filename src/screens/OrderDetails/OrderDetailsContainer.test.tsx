import React from 'react';

import OrderDetailsContainer from './OrderDetailsContainer';
import { render } from '../../testUtils';

/** OrderDetailsContainer to displays invalid request if customer details is invalid */
it('Displays invalid request message if customer details is invalid', () => {
  const mockRoute = { params: { orderId: 1, customerId: 9999 } };

  const { getByText } = render(
    <OrderDetailsContainer
      route={mockRoute as any}
      navigation={jest.fn() as any}
    />,
  );

  expect(getByText('Invalid request')).toBeTruthy();
});

/** TODO: Prepare Button press and side-effects after closing order (using actual function)*/

/** TODO: Prepare Button press and side-effects after timer times out (using actual function)*/
