import React, {useState} from 'react';
import './CoinDetails.sass';
import useCoin from '../../hooks/useCoin';
import useNavigation from '../../hooks/useNavigation';
import BackArrowIcon from '../../components/icons/BackArrowIcon';
import InfoIcon from '../../components/icons/InfoIcon';
import {PATH} from '../../contexts/NavigationProvider';
import emitter from '../../utils/Emitter';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import {EventData} from '../../models/config.model';

const CoinDetails: React.FC = () => {
  const {selectedCoin} = useCoin();
  const {goBack, navigate} = useNavigation();
  const [claimLoading, setClaimLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!selectedCoin) {
    return null;
  }

  const claimRewards = async () => {
    setClaimLoading(true);
    if (!selectedCoin.amountToClaim || !selectedCoin.validator) {
      throw Error('Ooops!');
    }
    try {
      emitter.emit('claim',
        new EventData(selectedCoin.id, selectedCoin.amountToClaim, selectedCoin.validator.name, selectedCoin.validator.address, 'claim'));
    } catch (e) {
      setErrorMessage(e.message);
      setTimeout(() => setErrorMessage(null), 2500);
    }
    setClaimLoading(false);
  };

  return (
    <div className='coin-details'>
      <div className='coin-details__header'>
        <div className='coin-details__top'>
          <button className='back-btn icon-btn' onClick={() => goBack()}>
            {<BackArrowIcon color={'rgba(var(--everstakeColorPrimary), 1)'}/>}
          </button>
          <h3 className='coin-details__title'>{selectedCoin.name}</h3>

          <a href={`https://everstake.one/${selectedCoin.name.toLowerCase()}`}
             aria-label={`Coin ${selectedCoin.name} on everstake`}
             target='_blank'
             className='info-btn icon-btn'>
            {<InfoIcon color={'rgba(var(--everstakeColorPrimary), 1)'}/>}
          </a>
        </div>
        <div className='coin-details__info'>
          <div className='info-block'>
            <img src={selectedCoin.iconUrl} alt={`${selectedCoin.name} coin icon`} className='info-block__icon'/>
            <div className='info-block__info'>
              <h3 className='info-block__title'>{`${selectedCoin.name} (${selectedCoin.symbol})`}</h3>
              <div className='info-block__bottom'>
                <p className='info-block__item'>APR: <span>{selectedCoin.apr}%</span></p>
                <p className='info-block__item'>Service fee: <span>{selectedCoin.fee}</span></p>
              </div>
            </div>
          </div>
          <div className='coin-details__actions'>
            <button className='coin-details__action stake-btn' onClick={() => navigate(PATH.STAKE, {amount: ''})}>Stake</button>
            <button className='coin-details__action open-calculator-btn' onClick={() => navigate(PATH.CALCULATOR)}>
              Open calculator
            </button>
          </div>
        </div>
      </div>

      <div className='coin-details__body'>
        {(selectedCoin.isStaked || selectedCoin.hasRewards) && <div className='coin-details__action-block'>
          {selectedCoin.isStaked && <div className='staked'>
            <p className='staked__title'>Staked</p>
            <div className='staked__wrap'>
              <p className='staked__amount'>{selectedCoin.amount} {selectedCoin.symbol}</p>
              <button onClick={() => navigate(PATH.UNSTAKE)} className='staked__action unstake-btn'>Unstake</button>
            </div>
            <div className='staked__info'>
              <p className='staked__item'>Validator: <span>{selectedCoin.validator?.name || '-'}</span></p>
              <p className='staked__item'>Yearly income: <span>{selectedCoin.apr}%</span></p>
            </div>
          </div>}

          {selectedCoin.hasRewards && <div className='rewards'>
            <button disabled={claimLoading} onClick={claimRewards} className='rewards__btn accent-btn'>Claim rewards</button>
            {errorMessage && <ErrorMessage className={'rewards__error'} text={errorMessage}/>}
            <p className='rewards__info'>Available rewards: <span>{selectedCoin.amountToClaim} {selectedCoin.symbol}</span></p>
          </div>}
        </div>}

        <div className='about'>
          <p className='about__title'>About</p>
          <p className='about__text'>{selectedCoin.about}</p>
        </div>
      </div>

    </div>
  );
};

export default CoinDetails;
