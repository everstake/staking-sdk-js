import React, {useState} from 'react';
import './CoinDetails.sass';
import useCoin from '../../hooks/useCoin';
import useNavigation from '../../hooks/useNavigation';
import BackArrowIcon from '../../components/icons/BackArrowIcon';
import InfoIcon from '../../components/icons/InfoIcon';
import {PATH} from '../../contexts/NavigationProvider';
import StakeInfo from './components/StakeInfo/StakeInfo';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const CoinDetails: React.FC = () => {
  const {selectedCoin} = useCoin();
  const {goBack, navigate} = useNavigation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!selectedCoin) {
    return null;
  }

  const openStakePage = () => {
    if (selectedCoin.stakeType === '1toN' && selectedCoin.stakeValidators && !!selectedCoin.stakeValidators.length) {
      setErrorMessage('Please unstake your funds first.');
      setTimeout(() => setErrorMessage(null), 3500);
      return;
    }
    navigate(PATH.STAKE, {amount: ''});
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
                {selectedCoin.stakeType !== '1toN' && <p className='info-block__item'>Service fee: <span>{selectedCoin.fee}</span></p>}
              </div>
            </div>
          </div>
          <div className='coin-details__actions'>
            <button className='coin-details__action stake-btn' onClick={openStakePage}>Stake</button>
            <button className='coin-details__action open-calculator-btn' onClick={() => navigate(PATH.CALCULATOR)}>
              Open calculator
            </button>
          </div>

        </div>
      </div>

      <div className='coin-details__body'>

        {errorMessage && <div className='coin-details__error'><ErrorMessage text={errorMessage}/></div>}

        <StakeInfo coin={selectedCoin}/>

        <div className='about'>
          <p className='about__title'>About</p>
          <p className='about__text'>{selectedCoin.about}</p>
        </div>
      </div>

    </div>
  );
};

export default CoinDetails;
