import React, {useState} from 'react';
import './Unstake.sass';
import useCoin from '../../hooks/useCoin';
import {Coin} from '../../models/coins.model';
import useNavigation from '../../hooks/useNavigation';
import CustomInput from '../../components/CustomInput/CustomInput';
import {useForm} from 'react-hook-form';
import CustomSlider from '../../components/CustomSlider/CustomSlider';
import BackArrowIcon from '../../components/icons/BackArrowIcon';
import Big from 'big.js';
import emitter from '../../utils/Emitter';
import useApi from '../../hooks/useApi';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import useWidgetState from '../../hooks/useWidgetState';

interface UnstakeForm {
  amount: string;
}

const Unstake: React.FC = () => {
  const {selectedCoin} = useCoin();
  const {goBack} = useNavigation();
  const [rangeValue, setRangeValue] = useState<number | number[]>(0);
  const [amount, setAmount] = useState<string>('');
  const {unstake} = useApi();
  const [unstakeLoading, setUnstakeLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {userCoinData, closeWidget} = useWidgetState();
  const {register, handleSubmit, errors, setValue, getValues} = useForm<UnstakeForm>({
    defaultValues: {amount}
  });

  if (!selectedCoin) {
    return null;
  }

  const valuetext = (value: number): string => {
    return `${value}%`;
  };

  const handleAmountChange = () => {
    const newAmountInBig = Big(getValues('amount') || 0);
    setAmount(getValues('amount'));
    if (selectedCoin && selectedCoin.amount) {
      const newRangeValue = +newAmountInBig.times(100).div(selectedCoin.amount).toFixed();
      setRangeValue(newRangeValue);
    }
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setRangeValue(newValue);
    if (selectedCoin && selectedCoin.amount && typeof newValue === 'number') {
      const newAmount = Big(selectedCoin.amount).times(newValue).div(100).toFixed();
      setAmount(newAmount);
      setValue('amount', newAmount);
    }
  };

  const handleUnstake = async(data: UnstakeForm) => {
    setUnstakeLoading(true);
    try {
      const address = userCoinData(selectedCoin?.symbol)?.address;
      if (!address) {
        throw Error('Address not fount');
      }
      const unstakeRes = await unstake(selectedCoin.id, {amount: data.amount, address});
      emitter.emit('unstake', unstakeRes);
      closeWidget();
    } catch (e) {
      setErrorMessage(e.message);
      setTimeout(() => setErrorMessage(null), 2500);
    }
    setUnstakeLoading(false);
  };

  const validateAmount = (value: number): string | true => {
    if (isNaN(value)) {
      return 'Amount must be number';
    } else if (amount && selectedCoin.amount && +amount > +selectedCoin.amount) {
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
      <div className='unstake__input-wrap'>
        <CustomInput name='amount'
                     onChange={handleAmountChange}
                     label='Enter amount'
                     labelRightHtml={LabelRight(selectedCoin)}
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

      <p className='unstake__time'>Unstake time</p>
      <p className='unstake__message'>The funds will return in one day</p>

      <button disabled={unstakeLoading} className='unstake__btn accent-btn'>Unstake</button>
      {errorMessage && <ErrorMessage className={'unstake__error'} text={errorMessage}/>}
    </form>

  </div>;
};

const LabelRight = (coin?: Coin) => {
  return {
    __html: `Staked: <span class='bold' style="color: rgba(var(--everstakeColorAccent), 1)">${coin?.amount} ${coin?.symbol}</span>`
  };
};

export default Unstake;
