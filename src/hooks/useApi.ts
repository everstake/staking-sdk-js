import axios from 'axios';
import {API} from '../models/constans';
import {ClaimParams, NewTransactionModel, StakeParams, UnstakeParams} from '../models/api.model';
import {CoinDto, StakeDto} from '../models/coins.model';

interface UseApi {
  getCoinList: () => Promise<CoinDto[]>;
  getStakeList: () => Promise<StakeDto[]>;
  stake: (id: string, params: StakeParams) => Promise<NewTransactionModel>;
  claim: (id: string, params: ClaimParams) => Promise<NewTransactionModel>;
  unstake: (id: string, params: UnstakeParams) => Promise<NewTransactionModel>;
}

const useApi = (): UseApi => {
  const getCoinList = async (): Promise<CoinDto[]> => {
    const res = await axios.get<CoinDto[]>(`${API}/coin`);
    return res.data;
  };

  const getStakeList = async (): Promise<StakeDto[]> => {
    const res = await axios.put<StakeDto[]>(`${API}/stake`);
    return res.data;
  };

  const stake = async (id: string, params: StakeParams): Promise<NewTransactionModel> => {
    const res = await axios.post<NewTransactionModel>(`${API}/coin/${id}/stake`, params);
    return res.data;
  };

  const claim = async (id: string, params: ClaimParams): Promise<NewTransactionModel> => {
    const res = await axios.post<NewTransactionModel>(`${API}/coin/${id}/claim`, params);
    return res.data;
  };

  const unstake = async (id: string, params: UnstakeParams): Promise<NewTransactionModel> => {
    const res = await axios.post<NewTransactionModel>(`${API}/coin/${id}/unstake`, params);
    return res.data;
  };

  return {getCoinList, getStakeList, stake, claim, unstake};

};

export default useApi;
