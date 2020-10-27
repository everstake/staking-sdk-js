import React from 'react';
import './CoinList.sass';
import useWidgetState from '../../hooks/useWidgetState';
import CloseIcon from '../../components/icons/CloseIcon';
import InfoIcon from '../../components/icons/InfoIcon';
import CoinItem, {CoinItemProps} from './components/CoinItem/CoinItem';
import useCoin from '../../hooks/useCoin';

const CoinList = () => {
  const {closeWidget} = useWidgetState();
  const {coinList, stakedCoinList, readyToStakeCoinList} = useCoin();

  return <div className='coin-list'>
    <div className='coin-list__header'>
      <button className='close-btn' onClick={() => closeWidget && closeWidget()}>{<CloseIcon/>}</button>
      <h3 className='coin-list__title'>Stake</h3>

      {/*ToDo: Добавить обработчик события*/}
      <button className='info-btn'>{<InfoIcon/>}</button>
    </div>

    {!!coinList && coinList.length > 0 ? <div className='coin-list__body'>
      {stakedCoinList.length && <>
        <p className='coin-list__subtitle'>Staked</p>
        <ul className='coin-list__list'>
          {stakedCoinList.map(coin => {
            const props = new CoinItemProps(coin);
            return <CoinItem {...props} key={coin.id}/>;
          })}
        </ul>
      </>}
      {readyToStakeCoinList.length && <>
        <p className='coin-list__subtitle'>Ready to stake</p>
        <ul className='coin-list__list'>
          {readyToStakeCoinList.map(coin => {
            const props = new CoinItemProps(coin);
            return <CoinItem {...props} key={coin.id}/>;
          })}
        </ul>
      </>}
    </div> : <p className='coin-list__subtitle'>No coins</p>}
  </div>;
};

export default CoinList;
