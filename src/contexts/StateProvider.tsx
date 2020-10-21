import React, {createContext, useState} from 'react';

interface StateContextI {
  isOpen: boolean;
  openWidget?: () => void;
  closeWidget?: () => void;
}

const initialValue: StateContextI = {
  isOpen: true
};

export const StateContext = createContext<StateContextI>(initialValue);

const StateProvider: React.FC = ({children}) => {
  const [state, setState] = useState<boolean>(initialValue.isOpen);

  const openWidget = () => {
    setState(true);
  };

  const closeWidget = () => {
    setState(false);
  };

  return <StateContext.Provider value={{isOpen: state, openWidget, closeWidget}}>
    {children}
  </StateContext.Provider>;
};

export default StateProvider;
