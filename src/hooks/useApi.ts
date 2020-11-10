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
    return res.data;
  };

  return {getCoinList, getStakeList};

};

export default useApi;
