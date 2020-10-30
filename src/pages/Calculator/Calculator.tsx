import React, {useEffect} from 'react';
import './Calculator.sass';
import useCoin from '../../hooks/useCoin';
import {Coin} from '../../models/coins.model';
import useNavigation from '../../hooks/useNavigation';
import BackArrowIcon from '../../components/icons/BackArrowIcon';
import Input from '../../components/Input/Input';
import {useForm} from 'react-hook-form';
import useCalculator from '../../hooks/useCalculator';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';

interface CalculatorParams {
  coinId: string;
}

interface CalculatorForm {
  amount: string;
  includeValidatorFee: boolean;
  includeReinvestment: boolean;
}

const Calculator: React.FC<CalculatorParams> = (params) => {
  const {coinId} = params;
  const {getCoin} = useCoin();
  const coin: Coin | undefined = getCoin(coinId);
  const {goBack} = useNavigation();
  const calculator = useCalculator();
  const {register, handleSubmit, errors, getValues} = useForm<CalculatorForm>({
    defaultValues: {
      amount: calculator.amount,
      includeValidatorFee: calculator.includeValidatorFee,
      includeReinvestment: calculator.includeReinvestment
    }
  });

  useEffect(() => {
    if (coin) {
      calculator.initCalculator(coin, '3');
    }
  }, [coin]);

  if (!coin) {
    return null;
  }

  const handleFormChange = (field: keyof CalculatorForm) => {
    switch (field) {
      case 'amount':
        calculator.updateAmount(getValues(field));
        break;
      case 'includeValidatorFee':
        calculator.isValidationFee(getValues(field));
        break;
      case 'includeReinvestment':
        calculator.isReinvestment(getValues(field));
        break;
      default:
        return;
    }
  };

  const validateAmount = (value: number): string | true => {
    if (isNaN(value)) {
      return 'Amount must be number';
    } else {
      return true;
    }
  };

  const proceedToStaking = (data: any) => {
    console.log('data', data);
  };

  return <div className='calculator'>
    <div className='calculator__header'>
      <button className='back-btn icon-btn' onClick={() => goBack()}>{<BackArrowIcon/>}</button>
      <h3 className='calculator__title'>Calculator</h3>
    </div>

    <form onSubmit={handleSubmit(proceedToStaking)}>
      <div className='calculator__input-wrap'>
        <Input name='amount'
               onChange={() => handleFormChange('amount')}
               label='Enter amount'
               placeholder='0.00'
               register={register({
                 required: {value: true, message: 'Amount cannot be empty'},
                 validate: validateAmount,
               })}
               type='number'
               suffix={coin?.symbol}
               errors={errors}/>
      </div>

      <div className='calculator__settings'>
        <div className='info'>
          <div className='info__item'>
            <p className='info__period'>Daily income</p>
            <p className='info__amount'>{calculator.dailyIncome || '0'}</p>
          </div>
          <div className='info__item'>
            <p className='info__period'>Monthly</p>
            <p className='info__amount'>{calculator.monthlyIncome || '0'}</p>
          </div>
          <div className='info__item'>
            <p className='info__period'>Yearly</p>
            <p className='info__amount'>{calculator.yearlyIncome || '0'}</p>
          </div>
        </div>

        <CustomCheckbox name='includeValidatorFee'
                        className='calculator__checkbox'
                        label='Include validator fee'
                        onChange={() => handleFormChange('includeValidatorFee')}
                        register={register}/>

        <CustomCheckbox name='includeReinvestment'
                        label='Reinvest earnings'
                        className='calculator__checkbox'
                        onChange={() => handleFormChange('includeReinvestment')}
                        register={register}/>

        <button className='calculator__btn accent__btn'>Proceed to staking</button>
      </div>
    </form>
  </div>;
};

export default Calculator;
