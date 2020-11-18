import axios from 'axios';
import {API} from '../models/constans';
import {CoinDto, StakeDto, StakeListParams} from '../models/coins.model';

interface UseApi {
  getCoinList: () => Promise<CoinDto[]>;
  getStakeList: (params: StakeListParams[]) => Promise<StakeDto[]>;
}

const useApi = (): UseApi => {
  const getCoinList = async (): Promise<CoinDto[]> => {
    const res = await axios.get<CoinDto[]>(`${API}/coin`);
    return res.data;
  };

  const getStakeList = async (params: StakeListParams[]): Promise<StakeDto[]> => {
    const res = await axios.put<StakeDto[]>(`${API}/stake`, params);
    // ToDo: нужно подчистить
    // const qwe = res.data;
    // qwe.map(stake => {
    //   if (stake.coinId === '1') {
        // @ts-ignore
        // stake.amountToClaim = '2';
        // @ts-ignore
        // stake.amount = '23';
        // @ts-ignore
        // stake.validators = [
        //   {
        //     address: 'hx8e6dcffdf06f850af5d372ac96389135e17d56d3',
        //     fee: '0',
        //     id: '0',
        //     isReliable: true,
        //     name: 'Everstake',
        //     amount: '123'
        //   }, {
        //     address: 'hx8e6dcffdf06f850af5d372ac96389135e17d56d4',
        //     fee: '0',
        //     id: '1',
        //     isReliable: false,
        //     name: 'Icon validator 1',
        //     amount: '321'
        //   }
        // ];
      // }
    // });
    return res.data;
  };

  return {getCoinList, getStakeList};

}

export default useApi;
