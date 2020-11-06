import {useContext} from 'react';
import {CoinContext, CoinI} from '../contexts/CoinProvider';

const useCoin = () => {
  return useContext<CoinI>(CoinContext);
};

export default useCoin;
