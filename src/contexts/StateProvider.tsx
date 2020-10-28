import React, {createContext, useState} from 'react';
import 'wicg-inert';
// import {KEYCODE} from '../models/utils';

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
    toggleInert(walletConfig.elemId, true);
    // document.addEventListener('keydown', checkCloseWidget);
  };

  const closeWidget = () => {
    setState(false);
    if (config) {
      toggleInert(config.elemId, false);
    }
    // setConfig(undefined);
    // document.removeEventListener('keydown', checkCloseWidget);

    // ToDo: Уточнить нужно ли обнулять конфиги и навигацию в этом месте
  };

  // const checkCloseWidget = (e: KeyboardEvent) => {
  //   if (e.key === KEYCODE.ESC) {
  //     closeWidget();
  //   }
  // };

  const toggleInert = (elemId: string, isInert: boolean) => {
    const widget = document.querySelector('#' + elemId);
    Array.from(document.body.children).forEach(child => {
      if (child !== widget) {
        // @ts-ignore
        child.inert = isInert;
      }
    });
  };

  return <StateContext.Provider value={{isOpen: state, openWidget, closeWidget, config}}>
    {children}
  </StateContext.Provider>;
};

export default StateProvider;
