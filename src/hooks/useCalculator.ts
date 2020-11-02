import {Coin} from '../models/coins.model';
import {CalculatorModel} from '../utils/calculator';
import {useEffect, useState} from 'react';

const useCalculator = () => {
  const [calculator, setCalculator] = useState<CalculatorModel | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [includeReinvestment, setIncludeReinvestment] = useState<boolean>(false);
  const [includeValidatorFee, setIncludeValidatorFee] = useState<boolean>(false);

  const initCalculator = (coin: Coin, fee: string) => {
    const newCalc = new CalculatorModel(coin, fee);
    newCalc.amount = amount;
    newCalc.includeValidatorFee = includeValidatorFee;
    newCalc.includeReinvestment = includeReinvestment;
    setCalculator(newCalc);
  };

  const updateAmount = (newAmount: string) => {
    if (!newAmount || isNaN(+newAmount)) {
      newAmount = '0';
    }
    if (calculator) {
      calculator.amount = newAmount;
    }
    setAmount(newAmount);
  };

  const isValidationFee = (validationFeeState: boolean) => {
    if (calculator) {
      calculator.includeValidatorFee = validationFeeState;
    }
    setIncludeValidatorFee(validationFeeState);
  };

  const isReinvestment = (reinvestmentState: boolean) => {
    if (calculator) {
      calculator.includeReinvestment = reinvestmentState;
    }
    setIncludeReinvestment(reinvestmentState);
  };

  useEffect(() => {}, [calculator, amount, includeReinvestment, includeValidatorFee]);

  return {
    initCalculator,
    amount,
    includeReinvestment,
    includeValidatorFee,
    updateAmount,
    isValidationFee,
    isReinvestment,
    dailyIncome: calculator ? calculator.dailyIncome : '0',
    monthlyIncome: calculator ? calculator.monthlyIncome : '0',
    yearlyIncome: calculator ? calculator.yearlyIncome : '0'
  };
};

export default useCalculator;
