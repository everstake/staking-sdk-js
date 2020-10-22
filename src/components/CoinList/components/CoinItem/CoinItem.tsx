import React from 'react';
import './CoinItem.sass';
import {Coin} from '../../../../models/coins.model';

export class CoinItemProps {
  id: string;
  name: string;
  apr?: number;
  iconUrl: string;
  symbol: string;
  amount?: string;
  constructor(coin: Coin) {
    this.id = coin.id;
    this.name = coin.name;
    this.apr = coin.apr;
    this.iconUrl = coin.iconUrl;
    this.symbol = coin.symbol;
    this.amount = coin.amount;
  }
}

const CoinItem: React.FC<CoinItemProps> = (props) => {
  return <li className='coin-item'>
    <img src={props.iconUrl} alt={`${props.name} coin icon`} className='coin-item__icon'/>
    <div className='coin-item__info'>
      <div className='coin-item__info-group'>
        <p className='coin-item__name'>{props.name}</p>
        <p className='coin-item__apr'>{props.apr ? props.apr + '%' : 'Coming soon'}</p>
      </div>
      {props.amount && +props.amount > 0 && <div className='coin-item__staked-sum'>{props.amount} {props.symbol}</div>}
    </div>
  </li>;
};

export default CoinItem;
