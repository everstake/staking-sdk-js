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
export declare class EventData {
    symbol: string;
    amount: string;
    validatorName: string;
    validatorAddress: string;
    type: Event;
    constructor(symbol: string, amount: string, validatorName: string, validatorAddress: string, type: Event);
}
export declare type Event = 'stake' | 'unstake' | 'claim';
