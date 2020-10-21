import React from 'react';
import NavigationProvider from './NavigationProvider';

const Providers: React.FC = ({children}) => {
  return (
    <NavigationProvider>
      {children}
    </NavigationProvider>
  );
};

export default Providers;
