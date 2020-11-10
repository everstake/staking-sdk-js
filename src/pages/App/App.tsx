import React, {MouseEvent, useEffect} from 'react';
import './App.sass';
import useNavigation from '../../hooks/useNavigation';
import useWidgetState from '../../hooks/useWidgetState';
import {PATH} from '../../contexts/NavigationProvider';
import CoinList from '../CoinList/CoinList';
import CoinDetails from '../CoinDetails/CoinDetails';
import Stake from '../Stake/Stake';
import Calculator from '../Calculator/Calculator';
import Unstake from '../Unstake/Unstake';
import {Config, UserCoin} from '../../models/config.model';

export interface StakingSdkProps {
  handlers: {
    onOpen: ((coins: UserCoin[]) => void) | undefined;
    onClose: (() => void) | undefined;
  };
  config: Config;
}

const App: React.FC<StakingSdkProps> = (props) => {
  const {init, isOpen, openWidget, closeWidget} = useWidgetState();
  const {route} = useNavigation();

  props.handlers.onOpen = (coins: UserCoin[]) => {
    openWidget(coins);
  };

  props.handlers.onClose = () => {
    closeWidget();
  };

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    init(props.config);
  }, []);

  return isOpen ? <div className='staking-sdk__backdrop' onClick={closeWidget}>
    <div className='staking-sdk' onClick={handleCardClick}>
      {route.path === PATH.COIN_LIST && <CoinList/>}
      {route.path === PATH.COIN_DETAILS && <CoinDetails/>}
      {route.path === PATH.STAKE && <Stake amount={(route.params && route.params.amount) || ''}/>}
      {route.path === PATH.CALCULATOR && <Calculator/>}
      {route.path === PATH.UNSTAKE && <Unstake/>}
    </div>
  </div> : null;
};

export default App;
