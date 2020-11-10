import React, {createContext, useEffect, useState} from 'react';
import 'wicg-inert';
import {KEYCODE} from '../models/utils';
import {Theme, Config, UserCoin} from '../models/config.model';
import {hexToRgb} from '../utils/utils';
import useNavigation from '../hooks/useNavigation';
import useCoin from '../hooks/useCoin';

export interface StateContextI {
  init: (walletConfig: Config) => void;
  isOpen: boolean;
  config?: Config;
  openWidget: (coins: UserCoin[]) => void;
  closeWidget: () => void;
}

const initialValue: StateContextI = {
  init: () => undefined,
  isOpen: false,
  openWidget: () => undefined,
  closeWidget: () => undefined,
};

export const StateContext = createContext<StateContextI>(initialValue);

const StateProvider: React.FC = ({children}) => {
  const {reset} = useNavigation();
  const [isOpen, setIsOpen] = useState<boolean>(initialValue.isOpen);
  const [config, setConfig] = useState<Config | undefined>(undefined);
  const {fetchCoins, clearUserCoins} = useCoin();

  const init = (walletConfig: Config) => {
    if (!walletConfig) {
      throw Error('Config not initialized');
    }
    setConfig(walletConfig);
    if (walletConfig.theme) {
      updateColorTheme(walletConfig.theme);
    }
  };

  const openWidget = (coins: UserCoin[]) => {
    if (!config) {
      throw Error('Config not initialized');
    }
    fetchCoins(coins);
    setIsOpen(true);
    addInert(config.id);
  };

  const closeWidget = () => {
    setIsOpen(false);
    removeInert();
    clearUserCoins();
    reset();
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
      root.style.setProperty('--everstake' + property.charAt(0).toUpperCase() + property.slice(1),
        hexToRgb(theme[property as (keyof Theme)]));
    });
  };

  return <StateContext.Provider value={{init, isOpen, openWidget, closeWidget, config}}>
    {children}
  </StateContext.Provider>;
};

export default StateProvider;
