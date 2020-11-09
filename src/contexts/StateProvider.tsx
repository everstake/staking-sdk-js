import React, {createContext, useEffect, useState} from 'react';
import 'wicg-inert';
import {KEYCODE} from '../models/utils';
import {StakingSdkTheme, StakingSdkConfig, StakingSdkUserCoin} from '../models/config.model';
import {hexToRgb} from '../utils/utils';
import useNavigation from '../hooks/useNavigation';

export interface StateContextI {
  init: (walletConfig: StakingSdkConfig) => void;
  isOpen: boolean;
  config?: StakingSdkConfig;
  openWidget: (coins: StakingSdkUserCoin[]) => void;
  closeWidget: () => void;
  userCoinData: (coinSymbol: string | undefined) => StakingSdkUserCoin | undefined;
}

const initialValue: StateContextI = {
  init: () => undefined,
  isOpen: false,
  openWidget: () => undefined,
  closeWidget: () => undefined,
  userCoinData: () => undefined
};

export const StateContext = createContext<StateContextI>(initialValue);

const StateProvider: React.FC = ({children}) => {
  const {reset} = useNavigation();
  const [state, setState] = useState<boolean>(initialValue.isOpen);
  const [config, setConfig] = useState<StakingSdkConfig | undefined>(undefined);
  const [userCoins, setUserCoins] = useState<StakingSdkUserCoin[]>([]);

  const init = (walletConfig: StakingSdkConfig) => {
    if (!walletConfig) {
      throw Error('Config not initialized');
    }
    setConfig(walletConfig);
    if (walletConfig.theme) {
      updateColorTheme(walletConfig.theme);
    }
  };

  const openWidget = (coins: StakingSdkUserCoin[]) => {
    if (!config) {
      throw Error('Config not initialized');
    }
    setUserCoins(coins);
    setState(true);
    addInert(config.id);
  };

  const closeWidget = () => {
    setState(false);
    removeInert();
    setUserCoins([]);
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

  const updateColorTheme = (theme: StakingSdkTheme) => {
    const root = document.documentElement;
    Object.keys(theme).forEach((property) => {
      root.style.setProperty('--everstake' + property.charAt(0).toUpperCase() + property.slice(1),
        hexToRgb(theme[property as (keyof StakingSdkTheme)]));
    });
  };

  const userCoinData = (coinSymbol: string | undefined): StakingSdkUserCoin | undefined => {
    if (!config || !coinSymbol) {
      return undefined;
    }
    return userCoins.find(coin => coin.symbol === coinSymbol);
  };

  return <StateContext.Provider value={{init, isOpen: state, openWidget, closeWidget, config, userCoinData}}>
    {children}
  </StateContext.Provider>;
};

export default StateProvider;
