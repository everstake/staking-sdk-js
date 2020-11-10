import React from 'react';
import './CoinItem.sass';
import { Coin } from '../../../../models/coins.model';
export declare class CoinItemProps {
    click: (coinId: string) => void;
    id: string;
    name: string;
    apr?: string;
    iconUrl: string;
    symbol: string;
    amount?: string;
    isActive: boolean;
    constructor(coin: Coin, click: (coinId: string) => void);
}
declare const CoinItem: React.FC<CoinItemProps>;
export default CoinItem;
