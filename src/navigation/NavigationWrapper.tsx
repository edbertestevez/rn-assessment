import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import AppNavigator from './AppNavigator';

const NavigationWrapper = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default NavigationWrapper;
