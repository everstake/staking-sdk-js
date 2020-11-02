import Big from 'big.js';
import {Coin} from '../models/coins.model';

export class CalculatorModel {
  private readonly coinSymbol: string;
  private readonly coinPrecision: number;
  private readonly periodSeconds: number;
  private readonly yieldPercent: string;
  private _amount = '0';
  private fee: string;
  private _includeReinvestment = false;
  private _includeValidatorFee = false;
  private INTERVAL_SCALE = 5;
  constructor(coin: Coin, fee: string) {
    this.coinSymbol = coin.symbol;
    this.coinPrecision = coin.precision;
    this.periodSeconds = coin.yieldInterval;
    this.yieldPercent = coin.yieldPercent;
    this.fee = fee;
  }

  private get perYear(): number {
    return this.calculate(YEAR_IN_SECONDS, this.periodSeconds);
  }

  private get perMonth(): number {
    return this.calculate(MONTHS_IN_SECONDS, this.periodSeconds);
  }

  private get perDay(): number {
    return this.calculate(DAY_IN_SECONDS, this.periodSeconds);
  }

  set includeReinvestment(isReinvestment: boolean) {
    this._includeReinvestment = isReinvestment;
  }
  set includeValidatorFee(isValidatorFee: boolean) {
    this._includeValidatorFee = isValidatorFee;
  }
  set amount(amount: string) {
    this._amount = amount || '0';
  }

  private periodScale(): string {
    let periodScale;
    if (this._includeValidatorFee) {
      periodScale = Big(this.yieldPercent).times(Big(1).minus(Big(this.fee).times(1e-2)));
    } else {
      periodScale = Big(this.yieldPercent);
    }
    return periodScale.times(1e-2).toFixed();
  }

  get dailyIncome(): string {
    return formatAmount(this.perDay, this.coinPrecision, this.coinSymbol);
  }
  get monthlyIncome(): string {
    return formatAmount(this.perMonth, this.coinPrecision, this.coinSymbol);
  }
  get yearlyIncome(): string {
    return formatAmount(this.perYear, this.coinPrecision, this.coinSymbol);
  }

  private calculate(duration: number, periodDuration: number): number {
    const periodCount = Big(duration).div(periodDuration).toFixed(this.INTERVAL_SCALE);
    let periodIncome = Big(0);
    if (this._includeReinvestment) {
      let count = periodCount;
      while (+count > 0) {
        const periodSize: number = Math.min(+count, 1);
        const periodAmount = Big(this._amount).plus(periodIncome);
        periodIncome = periodIncome.plus(periodAmount.times(this.periodScale()).times(periodSize));
        count = Big(count).minus(periodSize).toFixed();
      }
    } else {
      periodIncome = Big(this._amount).times(this.periodScale()).times(periodCount);
    }
    return +periodIncome.toFixed();
  }
}

export const formatAmount = (amount: number, precision: number, symbol: string): string => {
  return Big(amount).round(+precision).toFixed() + ' ' + symbol;
};

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

const MINUTE_IN_SECONDS = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE / MILLISECONDS_PER_SECOND;
const HOUR_IN_SECONDS = MINUTE_IN_SECONDS * MINUTES_PER_HOUR;
const DAY_IN_SECONDS = HOUR_IN_SECONDS * HOURS_PER_DAY;
const MONTHS_IN_SECONDS = DAY_IN_SECONDS * 30;
const YEAR_IN_SECONDS = DAY_IN_SECONDS * 365;


