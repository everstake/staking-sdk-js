export interface StakingSdkConfig {
  elemId: string;
  theme?: Theme;
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

export interface UserCoin {
  symbol: string;
  address: string;
  balance: string;
}

export type StakingSdkEvent = 'stake' | 'unstake' | 'claim';
