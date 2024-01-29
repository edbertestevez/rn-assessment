import { device } from 'detox';

import { PREPARE_TIME_SECONDS } from '../src/config';
import { getMilliseconds } from '../src/helpers';
import { TestIds } from '../src/testUtils';

const DEFAULT_TIMEOUT = 5000;

const sleepSeconds = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, getMilliseconds(seconds)));

const runInitialChecks = async () => {
  /** ORDERS Screen */
  const pendingEarnings = element(by.id(TestIds.ORDERS_PENDING_EARNINGS));
  const confirmedEarnings = element(by.id(TestIds.ORDERS_CONFIRMED_EARNINGS));

  /** ORDER DETAILS Screen */
  // Back button
  const backButton = element(by.id(TestIds.NAVIGATION_BACK));

  // Order status label should be OPEN
  const orderStatusLabel = element(by.id(TestIds.ORDER_DETAILS_STATUS));
  await waitFor(orderStatusLabel)
    .toHaveLabel('Status: OPEN')
    .withTimeout(DEFAULT_TIMEOUT);
  await expect(orderStatusLabel).toHaveLabel('Status: OPEN');

  // Check that prepare order button and close order is displayed
  const prepareOrderButton = element(
    by.id(TestIds.ORDER_DETAILS_PREPARE_ORDER_BUTTON),
  );
  const closeOrderButton = element(
    by.id(TestIds.ORDER_DETAILS_CLOSE_ORDER_BUTTON),
  );

  await waitFor(prepareOrderButton).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
  await expect(prepareOrderButton).toBeVisible();

  await waitFor(closeOrderButton).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
  await expect(closeOrderButton).toBeVisible();

  return {
    pendingEarnings,
    confirmedEarnings,
    prepareOrderButton,
    closeOrderButton,
    orderStatusLabel,
    backButton,
  };
};

describe('Order flow scenarios', () => {
  beforeAll(async () => {
    await device.launchApp({
      launchArgs: { detoxEnableSynchronization: 0 },
      newInstance: true,
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Order #1 is CLOSED even if item is not prepared', async () => {
    // Press 1st order item from list
    const orderItem1 = element(by.id(TestIds.ORDER_ITEMS)).atIndex(0);
    await waitFor(orderItem1).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await expect(orderItem1).toBeVisible();
    await orderItem1.tap();

    const {
      pendingEarnings,
      confirmedEarnings,
      orderStatusLabel,
      prepareOrderButton,
      closeOrderButton,
      backButton,
    } = await runInitialChecks();

    // Press close order button
    await closeOrderButton.tap();

    // Order status should be CLOSE
    await waitFor(orderStatusLabel)
      .toHaveLabel('Status: CLOSE')
      .withTimeout(DEFAULT_TIMEOUT);
    await expect(orderStatusLabel).toHaveLabel('Status: CLOSE');

    // Prepare order and close order button should be hidden
    await expect(prepareOrderButton).not.toBeVisible();
    await expect(closeOrderButton).not.toBeVisible();

    // Return to order screen
    await backButton.tap();

    /** ORDER Screen */
    // Confirmed Earnings should be increased
    await waitFor(confirmedEarnings).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await expect(confirmedEarnings).toHaveLabel('$21.69');

    // Pending Earnings should be deducted
    await waitFor(pendingEarnings).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await expect(pendingEarnings).toHaveLabel('$67.18');
  });

  it('Order #2 is CLOSED before PREPARE ORDER period times out', async () => {
    // Press 2nd order item from list
    const orderItem2 = element(by.id(TestIds.ORDER_ITEMS)).atIndex(1);
    await waitFor(orderItem2).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await expect(orderItem2).toBeVisible();
    await orderItem2.tap();

    const {
      pendingEarnings,
      confirmedEarnings,
      orderStatusLabel,
      prepareOrderButton,
      closeOrderButton,
      backButton,
    } = await runInitialChecks();

    // Press close order button
    await prepareOrderButton.tap();

    // Press close order button
    await closeOrderButton.tap();

    // Order status should be CLOSE
    await waitFor(orderStatusLabel)
      .toHaveLabel('Status: CLOSE')
      .withTimeout(DEFAULT_TIMEOUT);
    await expect(orderStatusLabel).toHaveLabel('Status: CLOSE');

    // Prepare order and close order button should be hidden
    await expect(prepareOrderButton).not.toBeVisible();
    await expect(closeOrderButton).not.toBeVisible();

    // Simulate no actions after required time expires
    await sleepSeconds(PREPARE_TIME_SECONDS);

    // After Prepare timeout expires, it should still be CLOSE status
    await expect(orderStatusLabel).toHaveLabel('Status: CLOSE');

    // Return to order screen
    await backButton.tap();

    /** ORDER Screen */
    // Confirmed Earnings should be increased
    await waitFor(confirmedEarnings).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await expect(confirmedEarnings).toHaveLabel('$46.16');

    // Pending Earnings should be deducted
    await waitFor(pendingEarnings).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await expect(pendingEarnings).toHaveLabel('$42.71');
  });

  it('Order #3 is not CLOSED after PREPARE ORDER period times out', async () => {
    // Press 3rd order item from list
    const orderItem3 = element(by.id(TestIds.ORDER_ITEMS)).atIndex(2);
    await waitFor(orderItem3).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await expect(orderItem3).toBeVisible();
    await orderItem3.tap();

    const {
      pendingEarnings,
      confirmedEarnings,
      orderStatusLabel,
      prepareOrderButton,
      closeOrderButton,
      backButton,
    } = await runInitialChecks();

    // Press close order button
    await prepareOrderButton.tap();

    // Return to order screen
    await backButton.tap();

    // Simulate no actions after required time expires
    await sleepSeconds(PREPARE_TIME_SECONDS + 3);

    // Return back to order details
    await orderItem3.tap();

    // Order status should be EXPIRED
    await waitFor(orderStatusLabel)
      .toHaveLabel('Status: EXPIRED')
      .withTimeout(DEFAULT_TIMEOUT);
    await expect(orderStatusLabel).toHaveLabel('Status: EXPIRED');

    // Prepare order and close order button should be hidden
    await expect(prepareOrderButton).not.toBeVisible();
    await expect(closeOrderButton).not.toBeVisible();

    // Return to order screen
    await sleepSeconds(2);
    await waitFor(backButton).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await backButton.tap();

    /** ORDER Screen */
    // Confirmed Earnings should be retained since status is EXPIRED
    await waitFor(confirmedEarnings).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await expect(confirmedEarnings).toHaveLabel('$46.16');

    // Pending Earnings should be deducted
    await waitFor(pendingEarnings).toBeVisible().withTimeout(DEFAULT_TIMEOUT);
    await expect(pendingEarnings).toHaveLabel('$24.96');
  });
});
