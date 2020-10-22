import React from 'react';
import NavigationProvider from './NavigationProvider';
import StateProvider from './StateProvider';
import CoinProvider from './CoinProvider';

const Providers: React.FC = ({children}) => {
  return (
    <StateProvider>
      <NavigationProvider>
        <CoinProvider>
          {children}
        </CoinProvider>
      </NavigationProvider>
    </StateProvider>
  );
};

export default Providers;
