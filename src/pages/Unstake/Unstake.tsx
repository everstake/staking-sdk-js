import React from 'react';
import './Unstake.sass';
import useCoin from '../../hooks/useCoin';
import {Coin} from '../../models/coins.model';
import useNavigation from '../../hooks/useNavigation';
import Input from '../../components/Input/Input';
import {useForm} from 'react-hook-form';

interface UnstakeParams {
  coinId: string;
}

const Unstake: React.FC<UnstakeParams> = (params) => {
  const {coinId} = params;
  const {getCoin} = useCoin();
  const coin: Coin | undefined = getCoin(coinId);
  const {goBack, navigate} = useNavigation();
  const {register, handleSubmit, errors} = useForm({
    defaultValues: {
      amount: '0'
    }
  });

  if (!coin) {
    return null;
  }

  return <div className='unstake'>
    Unstake<br/>
    coinId: {coinId}
    <br/>
    <Input name='amount'
           label='Enter amount'
           labelRightHtml={LabelRight(coin)}
           placeholder='0.00'
           register={register({
             required: {value: true, message: 'Amount cannot be empty'},
             validate: value => isNaN(value) ? 'Amount must be number' : true
           })}
           type='text'
           suffix={coin?.symbol}
           errors={errors}/>
  </div>;
};

const LabelRight = (coin?: Coin) => {
  return {
    __html: `Balance: <span class='bold' style="color: var(--everstakeColorAccent)">${0.043} ${coin?.symbol}</span>`
  };
};

export default Unstake;
