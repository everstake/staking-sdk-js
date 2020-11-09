import React from 'react';
import NavigationProvider from './NavigationProvider';
import StateProvider from './StateProvider';
import CoinProvider from './CoinProvider';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ValidatorsProvider from './ValidatorsProvider';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    }
  }
});

const Providers: React.FC = ({children}) => {
  return (
    <NavigationProvider>
      <StateProvider>
        <CoinProvider>
          <ValidatorsProvider>
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </ValidatorsProvider>
        </CoinProvider>
      </StateProvider>
    </NavigationProvider>
  );
};

export default Providers;
