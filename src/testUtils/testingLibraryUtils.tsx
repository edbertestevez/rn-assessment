import { NavigationContainer } from '@react-navigation/native';
import { RenderOptions, render } from '@testing-library/react-native';
import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

import { appTheme } from '../theme';

// Make use of this testing library when building unit tests
const AppProviders = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  return (
    <ThemeProvider theme={appTheme}>
      <NavigationContainer>{children}</NavigationContainer>
    </ThemeProvider>
  );
};

const renderWithContext = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AppProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { renderWithContext as render };
