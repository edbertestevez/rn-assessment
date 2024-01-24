/**
 * Note: react-dom is required to make the mobx 'observer' work during test
 */
import React from 'react';
import { ReactTestInstance } from 'react-test-renderer';

import OrderDetails from './OrderDetails';
import OrderDetailsContainer from './OrderDetailsContainer';
import { OrderStore } from '../../stores/OrderStore.tsx';
import {
  mockOrders,
  mockValidCloseOrder,
  mockValidCustomer101,
  mockValidOpenOrder,
  render,
  cleanup,
  fireEvent,
  TestIds,
} from '../../testUtils';
import { Order, OrderStatus } from '../../types/Order';

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
      onCloseOrder={jest.fn()}
      isProcessing={false}
      isOpen={true}
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

/** Close order button should be hidden if status is not open */
it('Should hide Close Order button if status is not open', async () => {
  const { queryByTestId } = render(
    <OrderDetails
      order={mockValidCloseOrder}
      customer={mockValidCustomer101}
      onCloseOrder={jest.fn()}
      isProcessing={false}
      isOpen={false}
    />,
  );

  const closeOrderButton = await queryByTestId(
    TestIds.ORDER_DETAILS_CLOSE_ORDER_BUTTON,
  );

  expect(closeOrderButton).toEqual(null);
});

/** Close order button should be displayed and works correctly if status is open */
it('Should display Close Order button if status is open and updates state correctly on press', () => {
  const mockedOrderStore = new OrderStore({ initOrders: mockOrders });

  // Spy on mobx action for trigger events
  const closeOrderSpy = jest.spyOn(mockedOrderStore, 'closeOrderById');

  const currentOrderId = mockValidOpenOrder.orderId;
  const currentOrder = mockedOrderStore.getOrderById(
    mockValidOpenOrder.orderId,
  ) as Order;

  const handleCloseOrderPress = () =>
    mockedOrderStore.closeOrderById(currentOrderId);

  const { getByTestId, getByText } = render(
    <OrderDetails
      order={currentOrder}
      customer={mockValidCustomer101}
      onCloseOrder={handleCloseOrderPress}
      isProcessing={false}
      isOpen={currentOrder.status === OrderStatus.OPEN}
    />,
  );

  const closeOrderButton = getByTestId(
    TestIds.ORDER_DETAILS_CLOSE_ORDER_BUTTON,
  );

  // Status is open initially
  expect(getByText('Status: OPEN')).toBeTruthy();

  // Close button is present
  expect(closeOrderButton).toBeTruthy();

  // Simulate button press to close the order
  fireEvent.press(closeOrderButton);
  expect(closeOrderSpy).toHaveBeenCalledTimes(1);

  // Check if order status has been updated
  expect(currentOrder.status).toEqual(OrderStatus.CLOSE);
  expect(getByText('Status: CLOSE')).toBeTruthy();
});

/** Close order button isProcessing label */
it('Should display Close Order button with Processing label if isProcessing', async () => {
  const { getByTestId } = render(
    <OrderDetails
      order={mockValidCloseOrder}
      customer={mockValidCustomer101}
      onCloseOrder={jest.fn()}
      isProcessing={true}
      isOpen={true}
    />,
  );

  expect(
    getByTestId(TestIds.ORDER_DETAILS_CLOSE_ORDER_BUTTON).props.children[0]
      .props.children,
  ).toEqual('Processing. . .');
});

/** Close order button default label */
it('Should display Close Order button with default label', async () => {
  const { getByTestId } = render(
    <OrderDetails
      order={mockValidCloseOrder}
      customer={mockValidCustomer101}
      onCloseOrder={jest.fn()}
      isProcessing={false}
      isOpen={true}
    />,
  );

  expect(
    getByTestId(TestIds.ORDER_DETAILS_CLOSE_ORDER_BUTTON).props.children[0]
      .props.children,
  ).toEqual('Close Order');
});
