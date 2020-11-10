import React from 'react';
import 'wicg-inert';
import { Config, UserCoin } from '../models/config.model';
export interface StateContextI {
    init: (walletConfig: Config) => void;
    isOpen: boolean;
    config?: Config;
    openWidget: (coins: UserCoin[]) => void;
    closeWidget: () => void;
}
export declare const StateContext: React.Context<StateContextI>;
declare const StateProvider: React.FC;
export default StateProvider;
