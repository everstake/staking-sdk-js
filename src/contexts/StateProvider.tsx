import React, {createContext, useState} from 'react';

interface StateContextI {
  isOpen: boolean;
  openWidget?: () => void;
  closeWidget?: () => void;
}

const initialValue: StateContextI = {
  // ToDo: Return default value (false)
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
    setTimeout(() => openWidget(), 5000);
  };

  return <StateContext.Provider value={{isOpen: state, openWidget, closeWidget}}>
    {children}
  </StateContext.Provider>;
};

export default StateProvider;
