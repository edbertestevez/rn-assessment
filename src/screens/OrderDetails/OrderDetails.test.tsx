import React from 'react';
import { ReactTestInstance } from 'react-test-renderer';

import OrderDetails from './OrderDetails';
import OrderDetailsContainer from './OrderDetailsContainer';
import TestIds from '../../testUtils/testIds';
import { render, cleanup } from '../../testUtils/testingLibraryUtils';
import {
  mockValidCloseOrder,
  mockValidCustomer101,
} from '../../utils/mockData';

// Cleanup after each test
afterEach(cleanup);

const getItemLabelByIndex = (
  orderDetailsItems: ReactTestInstance[],
  index: number,
) => {
  return orderDetailsItems[index].props.children[0].props.children;
};

const getItemQtyByIndex = (
  orderDetailsItems: ReactTestInstance[],
  index: number,
) => {
  return orderDetailsItems[index].props.children[1].props.children[0].props
    .children;
};

const getItemPriceByIndex = (
  orderDetailsItems: ReactTestInstance[],
  index: number,
) => {
  return orderDetailsItems[index].props.children[1].props.children[1].props
    .children;
};

/** Displays correct information */
it('Displays correct information on valid order', () => {
  const { getByText, getByTestId, getAllByTestId } = render(
    <OrderDetails
      order={mockValidCloseOrder}
      customer={mockValidCustomer101}
    />,
  );

  /** Displays correct order ID and status */
  expect(getByText('Order ID: 1')).toBeTruthy();
  expect(getByText('Status: CLOSE')).toBeTruthy();

  /** Displays correct customer details */
  expect(getByTestId(TestIds.CUSTOMER_ID).props.children).toEqual(
    `ID: ${mockValidCustomer101.customerId}`,
  );
  expect(getByTestId(TestIds.CUSTOMER_NAME).props.children).toEqual(
    `Name: ${mockValidCustomer101.customerName}`,
  );
  expect(getByTestId(TestIds.CUSTOMER_ADDRESS).props.children).toEqual(
    `Address: ${mockValidCustomer101.address}`,
  );
  expect(getByTestId(TestIds.CUSTOMER_EMAIL).props.children).toEqual(
    `Email: ${mockValidCustomer101.email}`,
  );
  expect(getByTestId(TestIds.CUSTOMER_PHONE).props.children).toEqual(
    `Phone: ${mockValidCustomer101.phone}`,
  );

  /** Displays correct list of order details items */
  const orderDetailsItems = getAllByTestId(TestIds.ORDER_DETAILS_ITEMS);
  expect(orderDetailsItems).toHaveLength(3);

  // Line item 1
  expect(getItemLabelByIndex(orderDetailsItems, 0)).toEqual(
    'Cheeseburger (101)',
  );
  expect(getItemQtyByIndex(orderDetailsItems, 0)).toEqual('2x');
  expect(getItemPriceByIndex(orderDetailsItems, 0)).toEqual('$9.99');

  // Line item 2
  expect(getItemLabelByIndex(orderDetailsItems, 1)).toEqual(
    'French Fries (102)',
  );
  expect(getItemQtyByIndex(orderDetailsItems, 1)).toEqual('1x');
  expect(getItemPriceByIndex(orderDetailsItems, 1)).toEqual('$3.49');

  // Line item 3
  expect(getItemLabelByIndex(orderDetailsItems, 2)).toEqual('Soda (103)');
  expect(getItemQtyByIndex(orderDetailsItems, 2)).toEqual('2x');
  expect(getItemPriceByIndex(orderDetailsItems, 2)).toEqual('$1.99');

  /** Displays correct total price **/
  // TODO: Revisit cause total price response from the API is incorrect
  expect(getByTestId(TestIds.ORDER_DETAILS_TOTAL_PRICE).props.children).toEqual(
    '$25.46',
  );

  // Displays correct Tax Free label
  expect(getByTestId(TestIds.ORDER_DETAILS_TAX_FREE).props.children).toEqual(
    'Tax Free: No',
  );

  // Displays correct timestamp
  expect(getByTestId(TestIds.ORDER_DETAILS_TIMESTAMP).props.children).toEqual(
    `Timestamp: ${mockValidCloseOrder.timestamp}`,
  );
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
