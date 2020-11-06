import React, {createContext, useEffect, useState} from 'react';
import 'wicg-inert';
import {KEYCODE} from '../models/utils';
import {Theme, StakingSdkConfig} from '../models/config.model';
import {hexToRgb} from '../utils/utils';
import emitter from '../utils/Emitter';

export interface StateContextI {
  isOpen: boolean;
  config?: StakingSdkConfig;
  openWidget: (walletConfig: StakingSdkConfig) => void;
  closeWidget?: () => void;
}

const initialValue: StateContextI = {
  isOpen: false,
  openWidget: () => undefined
};

export const StateContext = createContext<StateContextI>(initialValue);

const StateProvider: React.FC = ({children}) => {
  const [state, setState] = useState<boolean>(initialValue.isOpen);
  const [config, setConfig] = useState<StakingSdkConfig | undefined>(undefined);

  emitter.on('setConfig', (data) => {
    setConfig(data);
  });

  const openWidget = (walletConfig: StakingSdkConfig) => {
    setState(true);
    setConfig(walletConfig);
    addInert(walletConfig.elemId);
    if (walletConfig.theme) {
      updateColorTheme(walletConfig.theme);
    }
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

  const updateColorTheme = (theme: Theme) => {
    const root = document.documentElement;
    Object.keys(theme).forEach((property) => {
      root.style.setProperty('--everstake' + property.charAt(0).toUpperCase() + property.slice(1), hexToRgb(theme[property as (keyof Theme)]));
    });
  };

  return <StateContext.Provider value={{isOpen: state, openWidget, closeWidget, config}}>
    {children}
  </StateContext.Provider>;
};

export default StateProvider;
