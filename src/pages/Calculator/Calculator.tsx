import React from 'react';
import './Calculator.sass';
import useCoin from '../../hooks/useCoin';
import {Coin} from '../../models/coins.model';
import useNavigation from '../../hooks/useNavigation';
import {CalculatorModel} from '../../utils/calculator';
import BackArrowIcon from '../../components/icons/BackArrowIcon';

interface CalculatorParams {
  coinId: string;
}

const Calculator: React.FC<CalculatorParams> = (params) => {
  const {coinId} = params;
  const {getCoin} = useCoin();
  const coin: Coin | undefined = getCoin(coinId);
  const {goBack} = useNavigation();

  if (coin) {
    const calculator = new CalculatorModel(coin, '3');
    calculator.amount = '200';
    calculator.includeReinvestment = true;
    calculator.includeValidatorFee = true;
    console.log('-------------------12.34------------------');
    console.log('dailyIncome', calculator.dailyIncome);
    console.log('monthlyIncome', calculator.monthlyIncome);
    console.log('yearlyIncome', calculator.yearlyIncome);
    console.log('###################################');
  }

  if (!coin) {
    return null;
  }

  return <div className='calculator'>
    <div className='calculator__header'>
      <button className='back-btn icon-btn' onClick={() => goBack()}>{<BackArrowIcon/>}</button>
      <h3 className='calculator__title'>Calculator</h3>
    </div>
  </div>;
};

export default Calculator;
