/**
 * This file handles all modules mocking required for jest testing
 */

import '@testing-library/jest-native/extend-expect';

// Mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// Async Storage mocking:
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
