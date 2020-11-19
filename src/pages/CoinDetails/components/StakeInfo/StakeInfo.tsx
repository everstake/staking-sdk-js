import React, {useState} from 'react';
import './StakeInfo.sass';
import {Coin} from '../../../../models/coins.model';
import {PATH} from '../../../../contexts/NavigationProvider';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import {EVENT, EventData, EventDataValidator} from '../../../../models/config.model';
import emitter from '../../../../utils/Emitter';
import useNavigation from '../../../../hooks/useNavigation';
import {ValidatorDto} from '../../../../models/validators.model';
import {formatAmount, validatorsToText} from '../../../../utils/utils';

interface StakeInfoProps {
  coin: Coin;
}

const StakeInfo: React.FC<StakeInfoProps> = (props) => {
  const {coin} = props;
  const {stakeType, stakeValidators} = coin;
  const [claimLoading, setClaimLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const claim = async () => {
    setClaimLoading(true);
    if (!coin.amountToClaim || !coin.stakeValidators) {
      throw Error('Ooops!');
    }
    try {
      const validators: EventDataValidator[] = coin.stakeValidators.map(validator => {
        return {validatorName: validator.name, validatorAddress: validator.address};
      });
      emitter.emit(EVENT.CLAIM, new EventData(coin.symbol, coin.amountToClaim, validators, EVENT.CLAIM));
    } catch (e) {
      setErrorMessage(e.message);
      setTimeout(() => setErrorMessage(null), 2500);
    }
    setClaimLoading(false);
  };

  return <div className='claim-info'>
    {(coin.isStaked || coin.hasRewards) && <>
      {coin.isStaked && <>
        <p className={'claim-info__title' + (stakeType === 'Nto1' ? ' claim-info__title--list' : '')}>{stakeType === 'Nto1' ? 'List of stakes' : 'Staked'}</p>

        {stakeValidators && stakeType === '1to1' &&
        <Validator1to1 validators={stakeValidators} amount={coin.amount || '0'} symbol={coin.symbol}/>}
        {stakeValidators && stakeType === '1toN' &&
        <Validator1toN validators={stakeValidators} amount={coin.amount || '0'} symbol={coin.symbol}/>}
        {stakeValidators && stakeType === 'Nto1' &&
        <ValidatorNto1 validators={stakeValidators} symbol={coin.symbol}/>}
      </>}

      {coin.hasRewards && <div className='rewards'>
        <p className='rewards__info'>Available rewards: <span>{formatAmount(coin.amountToClaim || 0, coin.symbol)}</span></p>
        <button disabled={claimLoading} onClick={claim} className='rewards__btn accent-btn'>Claim rewards</button>
        {errorMessage && <ErrorMessage className={'rewards__error'} text={errorMessage}/>}
      </div>}
    </>}
  </div>;
};

const Validator1to1: React.FC<{ validators: ValidatorDto[], symbol: string, amount: string }> = (props) => {
  const {validators, amount, symbol} = props;
  const {navigate} = useNavigation();
  return <div className='staked'>
    <div className='staked__header'>
      <p className='staked__amount'>{formatAmount(amount, symbol)}</p>
      <button onClick={() => navigate(PATH.UNSTAKE)} className='staked__action unstake-btn'>Unstake</button>
    </div>

    <div className='validator'>
      Validator: <span className='validator__value'>{validators[0].name}</span>
    </div>
  </div>;
};

const Validator1toN: React.FC<{ validators: ValidatorDto[], symbol: string, amount: string }> = (props) => {
  const {validators, amount, symbol} = props;
  const {navigate} = useNavigation();

  return <div className='staked'>
    <div className='staked__header'>
      <p className='staked__amount'>{formatAmount(amount, symbol)}</p>
      <button onClick={() => navigate(PATH.UNSTAKE)} className='staked__action unstake-btn'>Unstake</button>
    </div>

    <div className='validator'>
      Validator: <span className='validator__value'>{validatorsToText(validators)}</span>
    </div>
  </div>;
};

const ValidatorNto1: React.FC<{ validators: ValidatorDto[], symbol: string }> = (props) => {
  const {validators, symbol} = props;
  const {navigate} = useNavigation();
  return <>
    {validators.map(validator => {
      return <div className='staked' key={validator.id}>
        <div className='staked__header'>
          <p className='staked__amount'>{formatAmount(validator.amount || 0, symbol)}</p>
          <button onClick={() => navigate(PATH.UNSTAKE)} className='staked__action unstake-btn'>Unstake</button>
        </div>

        <div className='validator'>
          Validator: <span className='validator__value'>{validator.name}</span>
        </div>
      </div>;
    })}
  </>;
};

export default StakeInfo;
