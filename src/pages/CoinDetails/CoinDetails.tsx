import React from 'react';
import './CoinDetails.sass';
import useCoin from '../../hooks/useCoin';
import useNavigation from '../../hooks/useNavigation';
import {Coin} from '../../models/coins.model';
import BackArrowIcon from '../../components/icons/BackArrowIcon';
import InfoIcon from '../../components/icons/InfoIcon';
import {PATH} from '../../contexts/NavigationProvider';

interface CoinDetailsParams {
  coinId: string;
}

const CoinDetails: React.FC<CoinDetailsParams> = (params) => {
  const {coinId} = params;
  const {getCoin} = useCoin();
  const coin: Coin | undefined = getCoin(coinId);
  const {goBack, navigate} = useNavigation();

  if (!coin) {
    return null;
  }

  return (
    <div className='coin-details'>
      <div className='coin-details__header'>
        <div className='coin-details__top'>
          <button className='back-btn' onClick={() => goBack()}>{<BackArrowIcon color={'var(--everstakeColorPrimary)'}/>}</button>
          <h3 className='coin-details__title'>{coin.name}</h3>

          {/*ToDo: Добавить обработчик события*/}
          <button className='info-btn'>{<InfoIcon color={'var(--everstakeColorPrimary)'}/>}</button>
        </div>
        <div className='coin-details__info'>
          <div className='info-block'>
            <img src={coin.iconUrl} alt={`${coin.name} coin icon`} className='info-block__icon'/>
            <div className='info-block__info'>
              <h3 className='info-block__title'>{`${coin.name} (${coin.symbol})`}</h3>
              <div className='info-block__bottom'>
                <p className='info-block__item'>APR: <span>{coin.apr}%</span></p>
                <p className='info-block__item'>Service fee: <span>{`${coin.fee.min}-${coin.fee.max}`}%</span></p>
              </div>
            </div>
          </div>
          <div className='coin-details__actions'>
            <button className='coin-details__action stake-btn' onClick={() => navigate(PATH.STAKE, {coinId})}>Stake</button>
            <button className='coin-details__action open-calculator-btn' onClick={() => navigate(PATH.STAKE, {coinId})}>Open calculator</button>
          </div>
        </div>
      </div>

      <div className='coin-details__body'>
        {coin.isStaked && <div className='staked'>
          <p className='staked__title'>Staked</p>
          <div className='staked__wrap'>
            <p className='staked__amount'>{coin.amount} {coin.symbol}</p>
            <button onClick={() => navigate(PATH.UNSTAKE, {coinId})} className='staked__action unstake-btn'>Unstake</button>
          </div>
          <div className='staked__info'>
            <p className='staked__item'>Validator: <span>{coin.validator?.validatorName || '-'}</span></p>
            <p className='staked__item'>Yearly income: <span>{coin.yieldPercent}%</span></p>
          </div>
        </div>}

        <div className='about'>
          <p className='about__title'>About</p>
          <p className='about__text'>{coin.about}</p>
        </div>
      </div>

    </div>
  );
};

export default CoinDetails;
