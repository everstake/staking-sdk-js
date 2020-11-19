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
    validators: EventDataValidator[];
    type: EVENT;
    constructor(symbol: string, amount: string, validators: EventDataValidator[], type: EVENT);
}
export declare class EventDataValidator {
    validatorName: string;
    validatorAddress: string;
    constructor(validatorName: string, validatorAddress: string);
}
export declare enum EVENT {
    STAKE = "stake",
    UNSTAKE = "unstake",
    CLAIM = "claim"
}
