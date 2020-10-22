import React, {createContext, useCallback, useEffect, useState} from 'react';
import useWidgetState from '../hooks/useWidgetState';
import {Coin, CoinDto, StakingInfoDto} from '../models/coins.model';
import axios from 'axios';
import {API} from '../models/constans';

interface CoinI {
  coinList: Coin[];
  stakedCoinList: Coin[];
  readyToStakeCoinList: Coin[];
}

const initialValue: CoinI = {
  coinList: [],
  stakedCoinList: [],
  readyToStakeCoinList: []
};

export const CoinContext = createContext<CoinI>(initialValue);

const CoinProvider: React.FC = ({children}) => {
  const [coinList, setCoinList] = useState<Coin[]>([]);
  const {isOpen} = useWidgetState();

  const fetchCoins = useCallback(async () => {
    const coinListRes = await axios.get<CoinDto[]>(`${API}/coin`);
    const stakingRes = await axios.put<StakingInfoDto[]>(`${API}/stake`);
    const newCoinList: Coin[] = [];
    coinListRes.data.forEach(coin => {
      const findCoinInStakedList = stakingRes.data.find(stake => stake.coinId === coin.id);
      newCoinList.push(new Coin(coin, findCoinInStakedList));
    });
    setCoinList(newCoinList);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      fetchCoins();
    }
  }, [isOpen]);

  const getStakedCoinList = (): Coin[] => {
    return coinList.filter(coin => coin.amount && +coin.amount > 0);
  };

  const getReadyToStakeCoinList = (): Coin[] => {
    return coinList.filter(coin => !coin.amount || +coin.amount === 0);
  };

  return <CoinContext.Provider value={{
    coinList,
    stakedCoinList: getStakedCoinList(),
    readyToStakeCoinList: getReadyToStakeCoinList()
  }}>
    {children}
  </CoinContext.Provider>;
};

export default CoinProvider;
