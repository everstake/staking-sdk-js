export interface StakingSdkConfig {
  id: string;
  theme?: StakingSdkTheme;
}

export interface StakingSdkTheme {
  colorPrimary: string;
  colorPrimaryDark: string;
  colorAccent: string;
  windowBackground: string;
  detailsHeaderBg: string;
  focusColor: string;
  colorGreen: string;
  warningColor: string;
}

export interface StakingSdkUserCoin {
  symbol: string;
  address: string;
  balance: string;
}

export type StakingSdkEvent = 'stake' | 'unstake' | 'claim';
