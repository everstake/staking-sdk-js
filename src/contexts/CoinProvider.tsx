import React, {createContext, useCallback, useEffect, useState} from 'react';
import useWidgetState from '../hooks/useWidgetState';
import {Coin, CoinDto, StakeDto} from '../models/coins.model';
import useApi from '../hooks/useApi';

const COIN_LIST_KEY = 'everstake-coin-list';
const STAKING_KEY = 'everstake-staking';

export interface CoinI {
  coinList: Coin[];
  coinListLoading: boolean;
  stakedCoinList: Coin[];
  readyToStakeCoinList: Coin[];
  getCoin: (coinId: string) => Coin | undefined;
  selectCoin: (coinId: string) => boolean;
  selectedCoin: Coin | undefined;
}

const initialValue: CoinI = {
  coinList: [],
  coinListLoading: false,
  stakedCoinList: [],
  readyToStakeCoinList: [],
  getCoin: () => undefined,
  selectCoin: () => false,
  selectedCoin: undefined
};

export const CoinContext = createContext<CoinI>(initialValue);

const mergeCoinList = (coins: CoinDto[], stakes: StakeDto[]): Coin[] => {
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
  const stakes: StakeDto[] = cacheStakes ? JSON.parse(cacheStakes) : [];
  return mergeCoinList(coins, stakes);
};

const CoinProvider: React.FC = ({children}) => {
  const [coinListLoading, setCoinListLoading] = useState<boolean>(initialValue.coinListLoading);
  const [coinList, setCoinList] = useState<Coin[]>(getCacheCoinList());
  const [selectedCoin, setSelectedCoin] = useState<Coin | undefined>(undefined);
  const {isOpen} = useWidgetState();
  const {getCoinList, getStakeList} = useApi();
  const [onlineStatus, setOnlineStatus] = useState<boolean>(navigator.onLine);

  const fetchCoins = useCallback(async () => {
    try {
      setCoinListLoading(true);
      const coinListRes = await getCoinList();
      localStorage.setItem(COIN_LIST_KEY, JSON.stringify(coinListRes));
      const stakingRes = await getStakeList();
      setOnlineStatus(true);
      localStorage.setItem(STAKING_KEY, JSON.stringify(stakingRes));
      setCoinList(mergeCoinList(coinListRes, stakingRes));
    } catch (e) {
      setCoinListLoading(false);
      if (e.message === 'Network Error') {
        setOnlineStatus(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchCoins();
    }
  }, [fetchCoins, isOpen]);

  useEffect(() => {
    if (!onlineStatus) {
      window.addEventListener('online',  fetchCoins);
    } else {
      window.removeEventListener('online',  fetchCoins);
    }
    return () => window.removeEventListener('online',  fetchCoins);
  }, [onlineStatus]);

  const getStakedCoinList = (): Coin[] => {
    return coinList.filter(coin => coin.isStaked);
  };

  const getReadyToStakeCoinList = (): Coin[] => {
    return coinList.filter(coin => !coin.isStaked);
  };

  const getCoin = (coinId: string): Coin | undefined => {
    return coinList.find(coin => coin.id === coinId);
  };

  const selectCoin = (coinId: string): boolean => {
    const findCoin = coinList.find(coin => coin.id === coinId);
    if (findCoin) {
      setSelectedCoin(findCoin);
      return true;
    } else {
      return false;
    }
  };

  return <CoinContext.Provider value={{
    coinList,
    coinListLoading,
    stakedCoinList: getStakedCoinList(),
    readyToStakeCoinList: getReadyToStakeCoinList(),
    getCoin,
    selectedCoin,
    selectCoin
  }}>
    {children}
  </CoinContext.Provider>;
};

export default CoinProvider;
