/**
 * This file handles all modules mocking required for jest testing
 */

import '@testing-library/jest-native/extend-expect';
import { cleanup } from '@testing-library/react-native';

// Mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// API Mock declarations
import { mockCustomersApiService } from './src/api/customers';
import { mockOrdersApiService } from './src/api/orders';
import { PREPARE_TIME_SECONDS } from './src/config';
import { getMilliseconds } from './src/utils';

// Global Jest actions
beforeAll(() => {
  // Add API service  mocks here
  mockCustomersApiService();
  mockOrdersApiService();
});

// Cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const mockTimerInMs = getMilliseconds(PREPARE_TIME_SECONDS);

// RTNTimer - Native module mocking
jest.mock('rtn-timer/js/NativeTimer', () => ({
  // Mock the native timer function using JS setTimeout
  runNativeTimer: jest.fn().mockImplementation(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve('Mocked timer result');
        }, mockTimerInMs);
      }),
  ),
}));

// Async Storage mocking:
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
