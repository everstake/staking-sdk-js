import React, {useEffect, useState} from 'react';
import './Calculator.sass';
import useCoin from '../../hooks/useCoin';
import useNavigation from '../../hooks/useNavigation';
import BackArrowIcon from '../../components/icons/BackArrowIcon';
import CustomInput from '../../components/CustomInput/CustomInput';
import {useForm} from 'react-hook-form';
import useCalculator from '../../hooks/useCalculator';
import CustomCheckbox from '../../components/CustomCheckbox/CustomCheckbox';
import CoinSelector from '../../components/CoinSelector/CoinSelector';
import ValidatorSelector from '../../components/ValidatorSelector/ValidatorSelector';
import useValidators from '../../hooks/useValidators';
import CalculateInfoCard from '../../components/CalculateInfoCard/CalculateInfoCard';
import {PATH} from '../../contexts/NavigationProvider';
import Big from 'big.js';
import {validatorsToText} from '../../utils/utils';

interface CalculatorForm {
  amount: string;
  includeValidatorFee: boolean;
  includeReinvestment: boolean;
}

const Calculator: React.FC = () => {
  const {selectedCoin} = useCoin();
  const {goBack, navigate} = useNavigation();
  const {config, initCalculator, updateAmount, isValidationFee, isReinvestment, dailyIncome, monthlyIncome, yearlyIncome} = useCalculator();
  const {selectedCoinValidators} = useValidators();
  const [isOpenCoinSelector, setIsOpenCoinSelector] = useState(false);
  const [isOpenValidatorSelector, setIsOpenValidatorSelector] = useState(false);
  const {register, handleSubmit, errors, getValues, setValue, control} = useForm<CalculatorForm>({
    defaultValues: {
      amount: config.amount,
      includeValidatorFee: config.includeValidatorFee,
      includeReinvestment: config.includeReinvestment
    }
  });

  useEffect(() => {
    if (selectedCoin && !isOpenCoinSelector && !isOpenValidatorSelector) {
      initCalculator(selectedCoin, selectedCoinValidators[0]?.fee || '0');
      setValue('amount', config.amount);
      setValue('includeValidatorFee', config.includeValidatorFee);
      setValue('includeReinvestment', config.includeReinvestment);
    }
  }, [selectedCoin, selectedCoinValidators, isOpenCoinSelector, isOpenValidatorSelector]);

  if (!selectedCoin) {
    return null;
  }

  const handleCheckboxChange = (name: keyof Omit<CalculatorForm, 'amount'>, checked: boolean) => {
    setValue(name, checked);
    changeCalculatorProperties(name);
  };

  const closeCoinSelector = () => {
    setIsOpenCoinSelector(false);
  };

  const openValidatorSelector = () => {
    setIsOpenValidatorSelector(true);
  };

  const closeValidatorSelector = () => {
    setIsOpenValidatorSelector(false);
  };

  const changeCalculatorProperties = (field: keyof CalculatorForm) => {
    switch (field) {
      case 'amount':
        updateAmount(getValues(field));
        break;
      case 'includeValidatorFee':
        isValidationFee(getValues(field));
        break;
      case 'includeReinvestment':
        isReinvestment(getValues(field));
        break;
      default:
        return;
    }
  };

  const validateAmount = (value: number): string | true => {
    if (isNaN(value)) {
      return 'Amount must be number';
    } else if (Big(value).eq(0)) {
      return 'Amount cannot be 0';
    } else {
      return true;
    }
  };

  const proceedToStaking = (data: CalculatorForm) => {
    navigate(PATH.STAKE, {amount: data.amount});
  };

  return <div className='calculator'>
    {isOpenCoinSelector && <CoinSelector close={closeCoinSelector}/>}
    {isOpenValidatorSelector && <ValidatorSelector close={closeValidatorSelector}/>}
    {(!isOpenCoinSelector && !isOpenValidatorSelector) && <div className='calculator__wrapper'>
      <div className='calculator__header'>
        <button className='back-btn icon-btn' onClick={() => goBack()}>{<BackArrowIcon/>}</button>
        <h3 className='calculator__title'>Calculator</h3>
      </div>

      <form onSubmit={handleSubmit(proceedToStaking)}>
        <div className='calculator__input-wrap'>
          <CustomInput name='amount'
                       onChange={() => changeCalculatorProperties('amount')}
                       label='Enter amount'
                       placeholder='0.00'
                       register={register({
                   required: {value: true, message: 'Amount cannot be empty'},
                   validate: validateAmount
                 })}
                       type='number'
                       suffix={selectedCoin.symbol}
                       errors={errors}/>
        </div>

        <div className='calculator__selectors'>
          <p className='selectors__header'>Select options</p>
          <button type='button' onClick={() => setIsOpenCoinSelector(true)} className='selectors__btn'>
            <span className='selectors__btn-container'>
              <span className='selectors__btn-info'>
                <span className='selectors__btn-title'>{selectedCoin.name}</span>
                <span className='selectors__btn-desc'>Yearly income: {selectedCoin.apr}%</span>
              </span>
              <span className='selectors__btn-type'>Currency</span>
            </span>
          </button>
          {selectedCoin.stakeType !== '1toN' && <button type='button' onClick={openValidatorSelector} className='selectors__btn'>
            <span
              className={'selectors__btn-container' + (selectedCoinValidators.find(validator => validator.isDefault) ? ' selectors__btn-container--accent' : '')}>
              <span className='selectors__btn-info'>
                <span className='selectors__btn-title'>{validatorsToText(selectedCoinValidators)}</span>
                <span className='selectors__btn-desc'>Fee: {selectedCoinValidators[0]?.fee || '0'}%</span>
              </span>
              <span className='selectors__btn-type'>Validator</span>
            </span>
          </button>}
        </div>

        <div className='calculator__settings'>

          <CalculateInfoCard
            dailyIncome={dailyIncome}
            monthlyIncome={monthlyIncome}
            yearlyIncome={yearlyIncome}/>

          {selectedCoin.stakeType !== '1toN' && <CustomCheckbox name='includeValidatorFee'
                           className='calculator__checkbox'
                           label='Include validator fee'
                           onChange={(checked) => handleCheckboxChange('includeValidatorFee', checked)}
                           control={control}/>}

          <CustomCheckbox name='includeReinvestment'
                          className='calculator__checkbox'
                          label='Reinvest earnings'
                          onChange={(checked) => handleCheckboxChange('includeReinvestment', checked)}
                          control={control}/>

          <button className='calculator__btn accent-btn'>Proceed to staking</button>
        </div>
      </form>
    </div>}
  </div>;
};

export default Calculator;
