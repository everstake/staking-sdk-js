import React, {createContext, useEffect, useState} from 'react';
import 'wicg-inert';
import {KEYCODE} from '../models/utils';

export class WalletConfig {
  elemId: string;
  theme?: Theme;
  constructor(elemId: string, theme?: Theme) {
    this.elemId = elemId;
    if (theme) {
      this.theme = theme;
    }
  }
}

export interface Theme {
  ColorPrimary: string;
  ColorPrimaryDark: string;
  ColorAccent: string;
  WindowBackground: string;
  DetailsHeaderBg: string;
  FocusColor: string;
  ColorGreen: string;
  WarningColor: string;
}

export interface StateContextI {
  isOpen: boolean;
  config?: WalletConfig;
  openWidget: (walletConfig: WalletConfig) => void;
  closeWidget?: () => void;
}

const initialValue: StateContextI = {
  isOpen: false,
  openWidget: () => undefined
};

const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) : '';
};

export const StateContext = createContext<StateContextI>(initialValue);

const StateProvider: React.FC = ({children}) => {
  const [state, setState] = useState<boolean>(initialValue.isOpen);
  const [config, setConfig] = useState<WalletConfig | undefined>(undefined);

  const openWidget = (walletConfig: WalletConfig) => {
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
