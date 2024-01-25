/**
 * This file handles all modules mocking required for jest testing
 */

import '@testing-library/jest-native/extend-expect';
import { cleanup } from '@testing-library/react-native';

// Mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// Async Storage mocking:
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// API Mock declarations
import { mockCustomersApiService } from './src/api/customers';
import { mockOrdersApiService } from './src/api/orders';

// Add API mocks here
beforeAll(() => {
  mockCustomersApiService();
  mockOrdersApiService();
});

// Cleanup after each test
afterAll(() => cleanup());
