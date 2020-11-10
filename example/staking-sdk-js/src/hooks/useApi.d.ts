import { CoinDto, StakeDto, StakeListParams } from '../models/coins.model';
interface UseApi {
    getCoinList: () => Promise<CoinDto[]>;
    getStakeList: (params: StakeListParams[]) => Promise<StakeDto[]>;
}
declare const useApi: () => UseApi;
export default useApi;
