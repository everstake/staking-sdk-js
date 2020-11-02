import React from 'react';
import './CoinSelector.sass';
import useCoin from '../../hooks/useCoin';
import CloseIcon from '../icons/CloseIcon';
import CoinItem, {CoinItemProps} from '../../pages/CoinList/components/CoinItem/CoinItem';

interface CoinSelectorProps {
  close: () => void;
}

const CoinSelector: React.FC<CoinSelectorProps> = (props) => {
  const {close} = props;
  const {coinList, selectCoin} = useCoin();

  const handleCoinClick = (coinId: string) => {
    const isSelected = selectCoin(coinId);
    if (isSelected) {
      close();
    }
  };

  return <div className='coin-selector'>
    <div className='coin-selector__header'>
      <button className='close-btn icon-btn' onClick={close}>{<CloseIcon/>}</button>
      <h3 className='coin-selector__title'>Select currency</h3>
    </div>

    {!!coinList && coinList.length > 0 ? <div className='coin-selector__body'>
      {coinList.length && <>
        <ul className='coin-selector__list'>
          {coinList.filter(coin => coin.isActive).map(coin => {
            const coinItemProps = new CoinItemProps(coin, handleCoinClick);
            return <CoinItem {...coinItemProps} key={coin.id}/>;
          })}
        </ul>
      </>}
    </div> : <p className='coin-selector__subtitle'>No coins</p>}
  </div>;
};

export default CoinSelector;
