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
import useApi from '../../hooks/useApi';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

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
  const {selectedCoin} = useCoin();
  // ToDo: use real balance
  const [balance, setBalance] = useState<string>('20');
  const {selectedCoinValidator} = useValidators();
  const [isOpenValidatorSelector, setIsOpenValidatorSelector] = useState(false);
  const [rangeValue, setRangeValue] = useState<number | number[]>(0);
  const {register, handleSubmit, errors, setValue, getValues} = useForm<StakeForm>({
    defaultValues: {amount: config.amount}
  });
  const {stake} = useApi();
  const [stakeLoading, setStakeLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getRangeValue = (partAmount: string, fullAmount: string): number => {
    return +Big(partAmount || 0).times(100).div(fullAmount).toFixed();
  };

  useEffect(() => {
    setRangeValue(getRangeValue(amount, balance));
  }, []);

  useEffect(() => {
    if (selectedCoin && selectedCoinValidator) {
      initCalculator(selectedCoin, selectedCoinValidator.fee);
      setValue('amount', config.amount);
    }
  }, [selectedCoin, selectedCoinValidator]);

  if (!selectedCoin || !selectedCoinValidator) {
    return null;
  }

  const handleAmount = () => {
    const formAmount = getValues('amount');
    updateAmount(formAmount);
    setRangeValue(getRangeValue(formAmount, balance));
  };

  const closeValidatorSelector = () => {
    setIsOpenValidatorSelector(false);
  };

  const validateAmount = (value: number): string | true => {
    if (isNaN(value)) {
      return 'Amount must be number';
    } else if (Big(value).gt(balance)) {
      return 'Amount cannot be more than your balance';
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

  const handleStake = async (data: StakeForm) => {
    setStakeLoading(true);
    try {
      const stakeRes = await stake(selectedCoin.id, {amount: data.amount, address: '', validatorId: selectedCoinValidator.id});
      emitter.emit('stake', stakeRes);
    } catch (e) {
      setErrorMessage(e.message);
      setTimeout(() => setErrorMessage(null), 2500);
    }
    setStakeLoading(false);
  };

  return <div className='stake'>
    {isOpenValidatorSelector && <ValidatorSelector close={closeValidatorSelector}/>}
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
        <button type='button' onClick={() => setIsOpenValidatorSelector(true)} className='selector__btn'>
            <span className={'selector__btn-container' + (selectedCoinValidator?.isDefault ? ' selector__btn-container--accent' : '')}>
              <span className='selector__btn-info'>
                <span className='selector__btn-title'>{selectedCoinValidator?.name}</span>
                <span className='selector__btn-desc'>Fee: {selectedCoinValidator?.fee}%</span>
              </span>
              {selectedCoinValidator?.isReliable && <p className='selector__reliable-label'>Reliable</p>}
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
