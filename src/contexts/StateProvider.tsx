import React, {createContext, useEffect, useState} from 'react';
import 'wicg-inert';
import {KEYCODE} from '../models/utils';

export class WalletConfig {
  elemId: string;
  constructor(elemId: string) {
    this.elemId = elemId;
  }
}

interface StateContextI {
  isOpen: boolean;
  config?: WalletConfig;
  openWidget: (walletConfig: WalletConfig) => void;
  closeWidget?: () => void;
}

const initialValue: StateContextI = {
  // ToDo: Return default value (false)
  isOpen: true,
  openWidget: () => undefined
};

export const StateContext = createContext<StateContextI>(initialValue);

const StateProvider: React.FC = ({children}) => {
  const [state, setState] = useState<boolean>(initialValue.isOpen);
  const [config, setConfig] = useState<WalletConfig | undefined>(undefined);

  const openWidget = (walletConfig: WalletConfig) => {
    setState(true);
    setConfig(walletConfig);
    addInert(walletConfig.elemId);
  };

  const closeWidget = () => {
    setState(false);
    removeInert();
    // setConfig(undefined);
    // ToDo: Уточнить нужно ли обнулять конфиги и навигацию в этом месте
  };

  const checkCloseWidget = (e: KeyboardEvent) => {
    if (e.key === KEYCODE.ESC) {
      closeWidget();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', checkCloseWidget);
    return () => {
      document.removeEventListener('keydown', checkCloseWidget);
    };
  }, []);

  const addInert = (elemId: string) => {
    const widget = document.querySelector('#' + elemId);
    Array.from(document.body.children).forEach(child => {
      if (child !== widget) {
        // @ts-ignore
        child.inert = true;
      }
    });
  };

  const removeInert = () => {
    Array.from(document.body.children).forEach(child => {
      // @ts-ignore
      child.inert = false;
    });
  };

  return <StateContext.Provider value={{isOpen: state, openWidget, closeWidget, config}}>
    {children}
  </StateContext.Provider>;
};

export default StateProvider;
