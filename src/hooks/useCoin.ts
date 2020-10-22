import {useContext} from 'react';
import {CoinContext} from '../contexts/CoinProvider';

const useCoin = () => {
  return useContext(CoinContext);
};

export default useCoin;
