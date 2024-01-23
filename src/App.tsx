import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';

import NavigationWrapper from './navigation/NavigationWrapper';
import { appTheme } from './theme';

const App = (): React.JSX.Element => {
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
