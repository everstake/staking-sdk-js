import Big from 'big.js';
import {ValidatorDto} from './validators.model';

export interface CoinDto {
  readonly id: string;
  readonly name: string;
  readonly stakeType: STAKE_TYPE;
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

export enum STAKE_TYPE {
  '1to1' = '1to1', // - Single stake for single validator (Tezos)
  'Nto1' = 'Nto1', // - Several stakes, each for one validator (Cosmos)
  '1toN' = '1toN', // - One stake, voting for multiple validators (ICON)
}

export interface StakeDto {
  readonly coinId: string;
  readonly amount: string;
  readonly amountToClaim: string;
  readonly validators: ValidatorDto[];
}

export class StakeListParams {
  constructor(public coinId: string, public address: string) {
  }
}

export class Coin implements CoinDto, Omit<Partial<StakeDto>, 'coinId'> {
  id: string;
  name: string;
  stakeType: STAKE_TYPE;
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
  stakeValidators?: ValidatorDto[];

  fee: string;

  constructor(coin: CoinDto, staking?: StakeDto) {
    this.id = coin.id;
    this.name = coin.name;
    this.stakeType = coin.stakeType;
    this.iconUrl = coin.iconUrl;
    this.apr = coin.apr;
    this.order = coin.order;
    this.yieldInterval = coin.yieldInterval;
    this.yieldPercent = coin.yieldPercent;
    this.isActive = coin.isActive;
    this.symbol = coin.symbol;
    this.precision = coin.precision;
    this.needsClaiming = coin.needsClaiming;
    this.intervalStake = coin.intervalStake;
    this.intervalUnstake = coin.intervalUnstake;
    this.toUsd = coin.toUsd;
    this.about = coin.about;
    this.aboutUrl = coin.aboutUrl;
    this.validators = coin.validators || [];

    if (staking) {
      this.amount = staking.amount;
      this.amountToClaim = staking.amountToClaim;
      this.stakeValidators = staking.validators;
    }

    this.fee = this.getFee();
  }

  get isStaked(): boolean {
    return !!this.amount && !isNaN(+this.amount) && !Big(this.amount).eq(0);
  }

  get hasRewards(): boolean {
    return !!this.amountToClaim && !isNaN(+this.amountToClaim) && !Big(this.amountToClaim).eq(0);
  }

  private getFee(): string {
    const feeArr = this.validators.map(validator => +validator.fee);
    const feeMin = Math.min(...feeArr);
    const feeMax = Math.max(...feeArr);
    return feeMin === feeMax ? feeMin + '%' : `${feeMin}-${feeMax}%`;
  }
}


