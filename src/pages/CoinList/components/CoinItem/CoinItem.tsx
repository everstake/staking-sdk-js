import React from 'react';
import './CoinItem.sass';
import {Coin} from '../../../../models/coins.model';
import useNavigation from '../../../../hooks/useNavigation';
import {PATH} from '../../../../contexts/NavigationProvider';

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
  const {navigate} = useNavigation();
  return <li className='coin-item'>
    <button className='coin-item__btn' onClick={() => navigate(PATH.COIN_DETAILS, {coinId: props.id})}>
      <img src={props.iconUrl} alt={`${props.name} coin icon`} className='coin-item__icon'/>
      <div className='coin-item__info'>
        <div className='coin-item__info-group'>
          <p className='coin-item__name'>{props.name}</p>
          <p className='coin-item__apr'>{props.apr ? props.apr + '%' : 'Coming soon'}</p>
        </div>
        {props.amount && +props.amount > 0 && <div className='coin-item__staked-sum'>{props.amount} {props.symbol}</div>}
      </div>
    </button>
  </li>;
};

export default CoinItem;
