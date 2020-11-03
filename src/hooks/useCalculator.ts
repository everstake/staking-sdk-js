import {Coin} from '../models/coins.model';
import {CalculatorModel} from '../utils/calculator';
import {useMemo, useState} from 'react';

interface CalculatorConfig {
  amount: string;
  includeReinvestment: boolean;
  includeValidatorFee: boolean;
}

const useCalculator = (amount = '') => {
  const [calculator, setCalculator] = useState<CalculatorModel | null>(null);
  const [config, setConfig] = useState<CalculatorConfig>({amount, includeReinvestment: false, includeValidatorFee: false});

  const initCalculator = (coin: Coin, fee: string) => {
    const newCalc = new CalculatorModel(coin, fee);
    newCalc.amount = config.amount;
    newCalc.includeValidatorFee = config.includeValidatorFee;
    newCalc.includeReinvestment = config.includeReinvestment;
    setCalculator(newCalc);
  };

  const updateAmount = (newAmount: string) => {
    if (!newAmount || isNaN(+newAmount)) {
      newAmount = '0';
    }
    if (calculator) {
      calculator.amount = newAmount;
    }
    setConfig(prevState => {
      return {...prevState, amount: newAmount};
    });
  };

  const isValidationFee = (validationFeeState: boolean) => {
    if (calculator) {
      calculator.includeValidatorFee = validationFeeState;
    }
    setConfig(prevState => {
      return {...prevState, includeValidatorFee: validationFeeState};
    });
  };

  const isReinvestment = (reinvestmentState: boolean) => {
    if (calculator) {
      calculator.includeReinvestment = reinvestmentState;
    }
    setConfig(prevState => {
      return {...prevState, includeReinvestment: reinvestmentState};
    });
  };

  const dailyIncome = useMemo<string>(() => {
    return calculator ? calculator.dailyIncome : '0';
  }, [calculator, config]);

  const monthlyIncome = useMemo<string>(() => {
    return calculator ? calculator.monthlyIncome : '0';
  }, [calculator, config]);

  const yearlyIncome = useMemo<string>(() => {
    return calculator ? calculator.yearlyIncome : '0';
  }, [calculator, config]);

  return {
    initCalculator,
    config,
    updateAmount,
    isValidationFee,
    isReinvestment,
    dailyIncome,
    monthlyIncome,
    yearlyIncome
  };
};

export default useCalculator;
