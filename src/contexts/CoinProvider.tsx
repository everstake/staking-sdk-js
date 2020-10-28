import React, {createContext, useCallback, useEffect, useState} from 'react';
import useWidgetState from '../hooks/useWidgetState';
import {Coin, CoinDto, StakingInfoDto} from '../models/coins.model';
import axios from 'axios';
import {API} from '../models/constans';

const COIN_LIST_KEY = 'everstake-coin-list';
const STAKING_KEY = 'everstake-staking';

interface CoinI {
  coinList: Coin[];
  stakedCoinList: Coin[];
  readyToStakeCoinList: Coin[];
  getCoin: (coinId: string) => Coin | undefined;
}

const initialValue: CoinI = {
  coinList: [],
  stakedCoinList: [],
  readyToStakeCoinList: [],
  getCoin: () => undefined
};

export const CoinContext = createContext<CoinI>(initialValue);

const getCoinList = (coins: CoinDto[], stakes: StakingInfoDto[]): Coin[] => {
  const newCoinList: Coin[] = [];
  coins.forEach(coin => {
    const findCoinInStakedList = stakes.find(stake => stake.coinId === coin.id);
    newCoinList.push(new Coin(coin, findCoinInStakedList));
  });
  return newCoinList;
};

const getCacheCoinList = (): Coin[] => {
  const cacheCoins = localStorage.getItem(COIN_LIST_KEY);
  const cacheStakes = localStorage.getItem(STAKING_KEY);

  const coins: CoinDto[] = cacheCoins ? JSON.parse(cacheCoins) : [];
  const stakes: StakingInfoDto[] = cacheStakes ? JSON.parse(cacheStakes) : [];
  return getCoinList(coins, stakes);
};

const CoinProvider: React.FC = ({children}) => {
  const [coinList, setCoinList] = useState<Coin[]>(getCacheCoinList());
  const {isOpen} = useWidgetState();

  const fetchCoins = useCallback(async () => {
    const coinListRes = await axios.get<CoinDto[]>(`${API}/coin`);
    localStorage.setItem(COIN_LIST_KEY, JSON.stringify(coinListRes.data));
    const stakingRes = await axios.put<StakingInfoDto[]>(`${API}/stake`);
    localStorage.setItem(STAKING_KEY, JSON.stringify(stakingRes.data));

    setCoinList(getCoinList(coinListRes.data, stakingRes.data));
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchCoins();
    }
  }, [fetchCoins, isOpen]);

  const getStakedCoinList = (): Coin[] => {
    return coinList.filter(coin => coin.isStaked);
  };

  const getReadyToStakeCoinList = (): Coin[] => {
    return coinList.filter(coin => !coin.isStaked);
  };

  const getCoin = (coinId: string): Coin | undefined => {
    return coinList.find(coin => coin.id === coinId);
  };

  return <CoinContext.Provider value={{
    coinList,
    stakedCoinList: getStakedCoinList(),
    readyToStakeCoinList: getReadyToStakeCoinList(),
    getCoin
  }}>
    {children}
  </CoinContext.Provider>;
};

export default CoinProvider;
