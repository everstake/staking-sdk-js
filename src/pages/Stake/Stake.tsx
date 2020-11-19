import React, {useEffect, useState} from 'react';
import './Stake.sass';
import BackArrowIcon from '../../components/icons/BackArrowIcon';
import useNavigation from '../../hooks/useNavigation';
import useCalculator from '../../hooks/useCalculator';
import CalculateInfoCard from '../../components/CalculateInfoCard/CalculateInfoCard';
import useCoin from '../../hooks/useCoin';
import ValidatorSelector from '../../components/ValidatorSelector/ValidatorSelector';
import useValidators from '../../hooks/useValidators';
import {useForm} from 'react-hook-form';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomSlider from '../../components/CustomSlider/CustomSlider';
import Big from 'big.js';
import emitter from '../../utils/Emitter';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import {EVENT, EventData, EventDataValidator} from '../../models/config.model';
import {validatorsToText} from '../../utils/utils';
import ValidatorMultiSelector from '../../components/ValidatorMultiSelector/ValidatorMultiSelector';

interface StakeParams {
  amount: string;
}

interface StakeForm {
  amount: string;
}

const Stake: React.FC<StakeParams> = (params) => {
  const {amount} = params;
  const {goBack} = useNavigation();
  const {config, initCalculator, updateAmount, dailyIncome, monthlyIncome, yearlyIncome} = useCalculator(amount);
  const {selectedCoin, userCoinData} = useCoin();
  const [balance, setBalance] = useState<string>('0');
  const {selectedCoinValidators} = useValidators();
  const [isOpenValidatorSelector, setIsOpenValidatorSelector] = useState(false);
  const [rangeValue, setRangeValue] = useState<number | number[]>(0);
  const {register, handleSubmit, errors, setValue, getValues} = useForm<StakeForm>({
    defaultValues: {amount: config.amount}
  });
  const [stakeLoading, setStakeLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getRangeValue = (partAmount: string, fullAmount: string): number => {
    return +Big(partAmount || 0).times(100).div(fullAmount === '0' ? 1 : fullAmount).toFixed();
  };

  useEffect(() => {
    setBalance(userCoinData(selectedCoin?.symbol)?.balance || '0');
    setRangeValue(getRangeValue(amount, balance));
  }, []);

  useEffect(() => {
    if (selectedCoin) {
      initCalculator(selectedCoin, selectedCoinValidators[0].fee);
      setValue('amount', config.amount);
    }
  }, [selectedCoin, selectedCoinValidators]);

  if (!selectedCoin) {
    return null;
  }

  const handleAmount = () => {
    const formAmount = getValues('amount');
    updateAmount(formAmount);
    setRangeValue(getRangeValue(formAmount, balance));
  };

  const openValidatorSelector = () => {
    setIsOpenValidatorSelector(true);
  };

  const closeValidatorSelector = () => {
    setIsOpenValidatorSelector(false);
  };

  const validateAmount = (value: number): string | true => {
    if (isNaN(value)) {
      return 'Amount must be number';
    } else if (Big(value).gt(balance)) {
      return 'Amount cannot be more than your balance';
    } else if (Big(value).eq(0)) {
      return 'Amount cannot be 0';
    } else {
      return true;
    }
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setRangeValue(newValue);
    if (typeof newValue === 'number') {
      const newAmount = Big(balance).times(newValue).div(100).toFixed();
      setValue('amount', newAmount);
      updateAmount(getValues('amount'));
    }
  };

  const valuetext = (value: number): string => {
    return `${value}% ${selectedCoin.symbol}`;
  };

  const handleStake = (data: StakeForm) => {
    setStakeLoading(true);
    try {
      if (selectedCoin.stakeType === '1to1' && selectedCoin.stakeValidators && selectedCoin.stakeValidators[0].id !== selectedCoinValidators[0].id) {
        throw Error('Cannot stake for a different validator. Unstake your funds first.');
      }
      const address = userCoinData(selectedCoin?.symbol)?.address;
      if (!address) {
        throw Error('Address not fount');
      }
      const validators: EventDataValidator[] = selectedCoinValidators.map(validator => {
        return {validatorName: validator.name, validatorAddress: validator.address};
      });
      emitter.emit(EVENT.STAKE, new EventData(selectedCoin.symbol, data.amount, validators, EVENT.STAKE));
    } catch (e) {
      setErrorMessage(e.message);
      setTimeout(() => setErrorMessage(null), 3500);
    }
    setStakeLoading(false);
  };

  return <div className='stake'>
    {isOpenValidatorSelector && (selectedCoin.stakeType !== '1toN' ?
      <ValidatorSelector close={closeValidatorSelector}/> :
      <ValidatorMultiSelector close={closeValidatorSelector}/>)
    }
    {!isOpenValidatorSelector && <form className='stake__form' onSubmit={handleSubmit(handleStake)}>
      <div className='stake__header'>
        <button className='back-btn icon-btn' onClick={() => goBack()}>{<BackArrowIcon/>}</button>
        <div className='stake__title-container'>
          <h3 className='stake__title'>New stake</h3>
          <p className='stake__subtitle'>Yearly income: <span>{selectedCoin.yieldPercent}%</span></p>
        </div>
      </div>

      <div className='stake__controls'>
        <div className='stake__input-wrap'>
          <CustomInput name='amount'
                       onChange={handleAmount}
                       label='Enter amount'
                       labelRightHtml={LabelRight(balance, selectedCoin.symbol)}
                       placeholder='0.00'
                       register={register({
                         required: {value: true, message: 'Amount cannot be empty'},
                         validate: validateAmount
                       })}
                       type='number'
                       suffix={selectedCoin?.symbol}
                       errors={errors}/>
        </div>

        <CustomSlider value={rangeValue} min={0} max={100} step={25} valuetext={valuetext} onChange={handleSliderChange}/>
      </div>

      <div className='stake__selector-wrap'>
        <p className='selector__header'>Select validator</p>
        <button type='button' onClick={openValidatorSelector} className='selector__btn'>
            <span className={'selector__btn-container' + (selectedCoinValidators.find(validator => validator.isDefault) ? ' selector__btn-container--accent' : '')}>
              {selectedCoin.stakeType !== '1toN' ?
                <>
                  <span className='selector__btn-info'>
                    <span className='selector__btn-title'>{validatorsToText(selectedCoinValidators)}</span>
                    {selectedCoin.stakeType !== '1toN' && <span className='selector__btn-desc'>Fee: {selectedCoinValidators[0].fee}%</span>}
                  </span>
                </> :
                <>
                  <span className='selector__btn-title'>{validatorsToText(selectedCoinValidators)}</span>
                </>
              }
              {selectedCoinValidators.find(validator => validator.isReliable) && <p className='selector__reliable-label'>Reliable</p>}
            </span>
        </button>
      </div>

      <div className='stake__bottom'>
        <button disabled={stakeLoading} className='stake__btn accent-btn'>Stake</button>

        {errorMessage && <ErrorMessage className={'stake__error'} text={errorMessage}/>}

        <CalculateInfoCard
          dailyIncome={dailyIncome}
          monthlyIncome={monthlyIncome}
          yearlyIncome={yearlyIncome}/>
      </div>
    </form>}

  </div>;
};

const LabelRight = (balance: string, symbol: string) => {
  return {
    __html: `Balance: <span class='bold' style="color: rgba(var(--everstakeColorAccent), 1)">${balance} ${symbol}</span>`
  };
};

export default Stake;
