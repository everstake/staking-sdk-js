export interface Config {
  id: string;
  theme?: Theme;
}

export interface Theme {
  colorPrimary: string;
  colorPrimaryDark: string;
  colorAccent: string;
  windowBackground: string;
  detailsHeaderBg: string;
  focusColor: string;
  colorGreen: string;
  warningColor: string;
}

export interface UserCoin {
  symbol: string;
  address: string;
  balance: string;
}

export class EventData {
  constructor(public symbol: string,
              public amount: string,
              public validatorName: string,
              public validatorAddress: string,
              public type: Event) {}
}

export type Event = 'stake' | 'unstake' | 'claim';
