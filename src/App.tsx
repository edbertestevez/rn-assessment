import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';

import NavigationWrapper from './navigation/NavigationWrapper';
import customerStore from './stores/CustomerStore';
import orderStore from './stores/OrderStore.tsx';
import { appTheme } from './theme';

const init = async () => {
  await customerStore.getCustomers();
  await orderStore.getOrders();
};

const App = (): React.JSX.Element => {
  useEffect(() => {
    init();
  });

  return (
    <ThemeProvider theme={appTheme}>
      <SafeAreaView>
        <Body>
          <NavigationWrapper />
        </Body>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const Body = styled(View)`
  display: flex;
  height: 100%;
`;

export default App;
