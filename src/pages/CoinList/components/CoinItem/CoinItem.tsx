import React from 'react';
import './CoinItem.sass';
import {Coin} from '../../../../models/coins.model';

export class CoinItemProps {
  id: string;
  name: string;
  apr?: string;
  iconUrl: string;
  symbol: string;
  amount?: string;
  isActive: boolean;
  constructor(coin: Coin, public click: (coinId: string) => void) {
    this.id = coin.id;
    this.name = coin.name;
    this.apr = coin.apr;
    this.iconUrl = coin.iconUrl;
    this.symbol = coin.symbol;
    this.amount = coin.amount;
    this.isActive = coin.isActive;
  }
}

const CoinItem: React.FC<CoinItemProps> = (props) => {
  return <li className='coin-item'>
    <button disabled={!props.isActive} type='button' className='coin-item__btn' onClick={() => props.click(props.id)}>
      <img src={props.iconUrl} alt={`${props.name} coin icon`} className='coin-item__icon'/>
      <div className='coin-item__info'>
        <div className='coin-item__info-group'>
          <p className='coin-item__name'>{props.name}</p>
          <p className='coin-item__apr'>{props.isActive ? props.apr + '%' : 'Coming soon'}</p>
        </div>
        {props.amount && +props.amount > 0 && <div className='coin-item__staked-sum'>{props.amount} {props.symbol}</div>}
      </div>
    </button>
  </li>;
};

export default CoinItem;
