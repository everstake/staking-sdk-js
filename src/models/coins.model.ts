export interface CoinDto {
  readonly id: string;
  readonly name: string;
  readonly iconUrl: string;
  readonly apr: number;
  readonly order: number;
  readonly yieldInterval: number;
  readonly yieldPercent: string;
  readonly isActive: boolean;
  readonly symbol: string;
  readonly precision: number;
  readonly needsClaiming: boolean;
  readonly intervalStake: number;
  readonly intervalUnstake: number;
  readonly toUsd: string;
  readonly about: string;
  readonly aboutUrl: string;
  readonly fee: FeeDto;
}

export interface FeeDto {
  readonly min: string;
  readonly max: string;
}

export interface StakingInfoDto {
  coinId: string;
  amount: string;
  amountToClaim: string;
  validator: StakingValidatorDto;
}

export interface StakingValidatorDto {
  id: string;
  validatorName: string;
  fee: string;
  isReliable: boolean;
}

export class Coin implements CoinDto, Omit<Partial<StakingInfoDto>, 'coinId'> {
  id: string;
  name: string;
  iconUrl: string;
  apr: number;
  order: number;
  yieldInterval: number;
  yieldPercent: string;
  isActive: boolean;
  symbol: string;
  precision: number;
  needsClaiming: boolean;
  intervalStake: number;
  intervalUnstake: number;
  toUsd: string;
  about: string;
  aboutUrl: string;
  fee: FeeDto;

  amount?: string;
  amountToClaim?: string;
  validator?: StakingValidatorDto;

  constructor(coin: CoinDto, staking?: StakingInfoDto) {
    this.id = coin.id;
    this.name = coin.name;
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
    this.fee = coin.fee;

    if (staking) {
      this.amount = staking.amount;
      this.amountToClaim = staking.amountToClaim;
      this.validator = staking.validator;
    }
  }

  get isStaked(): boolean {
    return !!this.amount && !isNaN(+this.amount) && +this.amount > 0;
  }
}
