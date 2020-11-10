import React from 'react';
import { Coin } from '../models/coins.model';
import { UserCoin } from '../models/config.model';
export interface CoinI {
    coinList: Coin[];
    coinListLoading: boolean;
    stakedCoinList: Coin[];
    readyToStakeCoinList: Coin[];
    getCoin: (coinId: string) => Coin | undefined;
    selectCoin: (coinId: string) => boolean;
    selectedCoin: Coin | undefined;
    userCoins: UserCoin[];
    fetchCoins: (coins: UserCoin[]) => void;
    clearUserCoins: () => void;
    userCoinData: (coinSymbol: string | undefined) => UserCoin | undefined;
}
export declare const CoinContext: React.Context<CoinI>;
declare const CoinProvider: React.FC;
export default CoinProvider;
