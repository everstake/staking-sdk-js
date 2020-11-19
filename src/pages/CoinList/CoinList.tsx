import React from 'react';
import './CoinList.sass';
import useWidgetState from '../../hooks/useWidgetState';
import CloseIcon from '../../components/icons/CloseIcon';
import InfoIcon from '../../components/icons/InfoIcon';
import CoinItem, {CoinItemProps} from './components/CoinItem/CoinItem';
import useCoin from '../../hooks/useCoin';
import useNavigation from '../../hooks/useNavigation';
import {PATH} from '../../contexts/NavigationProvider';
import Loader from '../../components/Loader/Loader';

const CoinList = () => {
  const {closeWidget} = useWidgetState();
  const {navigate} = useNavigation();
  const {coinList, coinListLoading, stakedCoinList, readyToStakeCoinList, selectCoin} = useCoin();

  const handleCoinClick = (coinId: string) => {
    const isSelected = selectCoin(coinId);
    if (isSelected) {
      navigate(PATH.COIN_DETAILS);
    }
  };

  return <div className='coin-list'>
    <div className='coin-list__header'>
      <button className='close-btn icon-btn' onClick={() => closeWidget && closeWidget()}>{<CloseIcon/>}</button>
      <h3 className='coin-list__title'>Stake</h3>

      <a href='https://everstake.one/'
         aria-label='Everstake'
         target='_blank'
         className='info-btn icon-btn'>
        {<InfoIcon/>}
      </a>
    </div>

    {coinListLoading && !coinList.length ? <div className='coin-list__loader-wrap'><Loader/></div> :
      !!coinList && coinList.length > 0 ? <div className='coin-list__body'>
        {!!stakedCoinList.length && <>
          <p className='coin-list__subtitle'>Staked</p>
          <ul className='coin-list__list'>
            {stakedCoinList.map(coin => {
              const props = new CoinItemProps(coin, handleCoinClick);
              return <CoinItem {...props} key={coin.id}/>;
            })}
          </ul>
        </>}
        {!!readyToStakeCoinList.length && <>
          <p className='coin-list__subtitle'>Ready to stake</p>
          <ul className='coin-list__list'>
            {readyToStakeCoinList.map(coin => {
              const props = new CoinItemProps(coin, handleCoinClick);
              return <CoinItem {...props} key={coin.id}/>;
            })}
          </ul>
        </>}
      </div> : <p className='coin-list__subtitle'>No coins</p>
    }
  </div>;
};

export default CoinList;
