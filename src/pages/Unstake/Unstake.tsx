import React, {ChangeEvent, useState} from 'react';
import './Unstake.sass';
import useCoin from '../../hooks/useCoin';
import {Coin} from '../../models/coins.model';
import useNavigation from '../../hooks/useNavigation';
import Input from '../../components/Input/Input';
import {useForm} from 'react-hook-form';
import CustomSlider from '../../components/CustomSlider/CustomSlider';
import BackArrowIcon from '../../components/icons/BackArrowIcon';

interface UnstakeParams {
  coinId: string;
}

interface UnstakeForm {
  amount: number | null;
}

const Unstake: React.FC<UnstakeParams> = (params) => {
  const {coinId} = params;
  const {getCoin} = useCoin();
  const coin: Coin | undefined = getCoin(coinId);
  const {goBack, navigate} = useNavigation();
  const [rangeValue, setRangeValue] = useState<number | number[]>(0);
  const [amount, setAmount] = useState<number | null>(null);
  const {register, handleSubmit, errors, setValue, getValues} = useForm<UnstakeForm>({
    defaultValues: {amount}
  });

  if (!coin) {
    return null;
  }

  const valuetext = (value: number) => {
    return `${value}%`;
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAmount = getValues('amount') || 0;
    setAmount(getValues('amount'));
    if (coin && coin.amount) {
      const newRangeValue = newAmount * 100 / +coin.amount;
      setRangeValue(newRangeValue);
    }
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setRangeValue(newValue);
    if (coin && coin.amount && typeof newValue === 'number') {
      const newAmount = +coin.amount * newValue / 100;
      setAmount(newAmount);
      setValue('amount', newAmount);
    }
  };

  const handleUnstake = (e: any) => {
    console.log('Unstake', getValues('amount'));
  };

  const validateAmount = (value: number): string | true => {
    if (isNaN(value)) {
      return 'Amount must be number';
    } else if (amount && coin.amount && +amount > +coin.amount) {
      return 'Amount too large';
    } else {
      return true;
    }
  };

  return <div className='unstake'>
    <div className='unstake__header'>
      <button className='back-btn icon-btn' onClick={() => goBack()}>{<BackArrowIcon/>}</button>
      <h3 className='unstake__title'>New unstake</h3>
    </div>

    <form onSubmit={handleSubmit(handleUnstake)} className='unstake__form'>
      <Input name='amount'
             onChange={handleAmountChange}
             label='Enter amount'
             labelRightHtml={LabelRight(coin)}
             placeholder='0.00'
             register={register({
               required: {value: true, message: 'Amount cannot be empty'},
               validate: validateAmount,
             })}
             type='number'
             suffix={coin?.symbol}
             errors={errors}/>

      <CustomSlider value={rangeValue} min={0} max={100} step={20} valuetext={valuetext} onChange={handleSliderChange}/>

      <p className='unstake__time'>Unstake time</p>
      <p className='unstake__message'>The funds will return in one day</p>

      <button className='unstake__btn accent__btn'>Unstake</button>
    </form>

  </div>;
};

const LabelRight = (coin?: Coin) => {
  return {
    __html: `Staked: <span class='bold' style="color: var(--everstakeColorAccent)">${coin?.amount} ${coin?.symbol}</span>`
  };
};

export default Unstake;
