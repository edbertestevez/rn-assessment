import React from 'react';
import { act } from 'react-test-renderer';
import RTNTimer from 'rtn-timer/js/NativeTimer';

import OrderDetailsContainer from './OrderDetailsContainer';
import { mockValidCustomer101 } from '../../api/customers';
import { mockValidOpenOrder } from '../../api/orders';
import { PREPARE_TIME_SECONDS } from '../../config';
import { getMilliseconds } from '../../helpers';
import customerStore from '../../stores/CustomerStore';
import orderStore from '../../stores/OrderStore';
import { TestIds, fireEvent, render, waitFor } from '../../testUtils';

jest.useFakeTimers();

describe('OrderDetailsContainer', () => {
  beforeEach(async () => {
    // Clear all locally tracked ids
    await orderStore.clearStoredIds();

    // Initialize order store with mock api
    await orderStore.getOrders();

    // Initialize customer store with mock api
    await customerStore.getCustomers();
  });

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

  /** Prepare Button press and side-effects after closing order within the timer */
  it('Handles proper logic and side effect of preparing order', async () => {
    const orderId = mockValidOpenOrder.orderId;
    const customerId = mockValidCustomer101.customerId;

    const mockRoute = {
      params: {
        orderId,
        customerId,
      },
    };

    const { getByTestId, getByText, queryByTestId } = render(
      <OrderDetailsContainer
        route={mockRoute as any}
        navigation={jest.fn() as any}
      />,
    );

    expect(getByTestId(TestIds.ORDER_DETAILS_HEADER)).toBeTruthy();

    const prepareOrderButton = getByTestId(
      TestIds.ORDER_DETAILS_PREPARE_ORDER_BUTTON,
    );
    const prepareOrderButtonLabel = getByTestId(
      TestIds.ORDER_DETAILS_PREPARE_ORDER_BUTTON_LABEL,
    );
    const closeOrderButton = getByTestId(
      TestIds.ORDER_DETAILS_CLOSE_ORDER_BUTTON,
    );

    // Correct default display
    expect(prepareOrderButton).toBeTruthy();
    expect(prepareOrderButtonLabel).toHaveTextContent('Prepare Order');

    // Press Prepare Order button to start preparing the order
    act(() => {
      fireEvent.press(prepareOrderButton);
    });

    // Native timer should be triggered
    expect(RTNTimer?.runNativeTimer).toHaveBeenCalledTimes(1);
    expect(RTNTimer?.runNativeTimer).toHaveBeenCalledWith(PREPARE_TIME_SECONDS);

    // Prepare button label should be updated
    expect(prepareOrderButtonLabel).toHaveTextContent('Preparing...');

    // Press close order button before timer expires
    act(() => {
      fireEvent.press(closeOrderButton);
    });

    // Status should be set to close
    expect(getByText('Status: CLOSE')).toBeTruthy();

    // Prepare order button should be hidden
    // Note: Don't use the variable with the same testId earlier since it will return truthy
    expect(
      queryByTestId(TestIds.ORDER_DETAILS_PREPARE_ORDER_BUTTON),
    ).toBeNull();

    // Close order button should be hidden
    // Note: Don't use the variable with the same testId earlier since it will return truthy
    expect(queryByTestId(TestIds.ORDER_DETAILS_CLOSE_ORDER_BUTTON)).toBeNull();

    // Simulate that timer has finished
    act(() => {
      jest.advanceTimersByTime(getMilliseconds(PREPARE_TIME_SECONDS));
    });
  });

  /** Prepare Button press and side-effects after timer times out without closing the order*/
  // Similar behavior and parameters in UI with previous test but differs in side-effects and interactions
  it('Handles proper logic and side effect of not closing within the prepare order timer', async () => {
    const orderId = mockValidOpenOrder.orderId;
    const customerId = mockValidCustomer101.customerId;

    const mockRoute = {
      params: {
        orderId,
        customerId,
      },
    };

    const { getByTestId, getByText, queryByTestId } = render(
      <OrderDetailsContainer
        route={mockRoute as any}
        navigation={jest.fn() as any}
      />,
    );

    // Press Prepare Order button to start preparing the order
    act(() => {
      fireEvent.press(getByTestId(TestIds.ORDER_DETAILS_PREPARE_ORDER_BUTTON));
    });

    // Simulate that timer has expired and order was note closed
    act(() => {
      jest.advanceTimersByTime(getMilliseconds(PREPARE_TIME_SECONDS));
    });

    waitFor(() => {
      // Status should be set to expired
      expect(getByText('Status: EXPIRED')).toBeTruthy();

      // Prepare order button should be hidden
      // Note: Don't use the variable with the same testId earlier since it will return truthy
      expect(
        queryByTestId(TestIds.ORDER_DETAILS_PREPARE_ORDER_BUTTON),
      ).toBeNull();

      // Close order button should be hidden
      // Note: Don't use the variable with the same testId earlier since it will return truthy
      expect(
        queryByTestId(TestIds.ORDER_DETAILS_CLOSE_ORDER_BUTTON),
      ).toBeNull();
    });
  });
});
