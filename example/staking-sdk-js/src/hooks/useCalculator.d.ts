import { Coin } from '../models/coins.model';
interface CalculatorConfig {
    amount: string;
    includeReinvestment: boolean;
    includeValidatorFee: boolean;
}
declare const useCalculator: (amount?: string) => {
    initCalculator: (coin: Coin, fee: string) => void;
    config: CalculatorConfig;
    updateAmount: (newAmount: string) => void;
    isValidationFee: (validationFeeState: boolean) => void;
    isReinvestment: (reinvestmentState: boolean) => void;
    dailyIncome: string;
    monthlyIncome: string;
    yearlyIncome: string;
};
export default useCalculator;
