import React from 'react';
import './CoinDetails.sass';
import useCoin from '../../hooks/useCoin';
import useNavigation from '../../hooks/useNavigation';
import BackArrowIcon from '../../components/icons/BackArrowIcon';
import InfoIcon from '../../components/icons/InfoIcon';
import {PATH} from '../../contexts/NavigationProvider';
import ClaimInfo from './components/ClaimInfo/ClaimInfo';

const CoinDetails: React.FC = () => {
  const {selectedCoin} = useCoin();
  const {goBack, navigate} = useNavigation();

  if (!selectedCoin) {
    return null;
  }

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
        <ClaimInfo coin={selectedCoin}/>

        <div className='about'>
          <p className='about__title'>About</p>
          <p className='about__text'>{selectedCoin.about}</p>
        </div>
      </div>

    </div>
  );
};

export default CoinDetails;
