/**
 * This file handles all modules mocking required for jest testing
 */

import '@testing-library/jest-native/extend-expect';

// Async Storage mocking:
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('rtn-timer/js/NativeTimer');
