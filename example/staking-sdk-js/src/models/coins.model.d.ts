import { ValidatorDto } from './validators.model';
export interface CoinDto {
    readonly id: string;
    readonly name: string;
    readonly iconUrl: string;
    readonly apr: string;
    readonly order: string;
    readonly yieldInterval: string;
    readonly yieldPercent: string;
    readonly isActive: boolean;
    readonly symbol: string;
    readonly precision: string;
    readonly needsClaiming: boolean;
    readonly intervalStake: string;
    readonly intervalUnstake: string;
    readonly toUsd: string;
    readonly about: string;
    readonly aboutUrl: string;
    readonly validators: ValidatorDto[];
}
export interface StakeDto {
    readonly coinId: string;
    readonly amount: string;
    readonly amountToClaim: string;
    readonly validator: ValidatorDto;
}
export declare class StakeListParams {
    coinId: string;
    address: string;
    constructor(coinId: string, address: string);
}
export declare class Coin implements CoinDto, Omit<Partial<StakeDto>, 'coinId'> {
    id: string;
    name: string;
    iconUrl: string;
    apr: string;
    order: string;
    yieldInterval: string;
    yieldPercent: string;
    isActive: boolean;
    symbol: string;
    precision: string;
    needsClaiming: boolean;
    intervalStake: string;
    intervalUnstake: string;
    toUsd: string;
    about: string;
    aboutUrl: string;
    validators: ValidatorDto[];
    amount?: string;
    amountToClaim?: string;
    validator?: ValidatorDto;
    fee: string;
    constructor(coin: CoinDto, staking?: StakeDto);
    get isStaked(): boolean;
    get hasRewards(): boolean;
    private getFee;
}
