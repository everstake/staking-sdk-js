import { Coin } from '../models/coins.model';
export declare class CalculatorModel {
    private readonly coinSymbol;
    private readonly coinPrecision;
    private readonly periodSeconds;
    private readonly yieldPercent;
    private _amount;
    private fee;
    private _includeReinvestment;
    private _includeValidatorFee;
    private INTERVAL_SCALE;
    constructor(coin: Coin, fee: string);
    private get perYear();
    private get perMonth();
    private get perDay();
    set includeReinvestment(isReinvestment: boolean);
    set includeValidatorFee(isValidatorFee: boolean);
    set amount(amount: string);
    private periodScale;
    get dailyIncome(): string;
    get monthlyIncome(): string;
    get yearlyIncome(): string;
    private calculate;
}
