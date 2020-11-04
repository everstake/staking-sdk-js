import React, {MouseEvent} from 'react';
import './StakingSdk.sass';
import useNavigation from '../../hooks/useNavigation';
import useWidgetState from '../../hooks/useWidgetState';
import {WalletConfig} from '../../contexts/StateProvider';
import {PATH} from '../../contexts/NavigationProvider';
import CoinList from '../CoinList/CoinList';
import CoinDetails from '../CoinDetails/CoinDetails';
import Stake from '../Stake/Stake';
import Calculator from '../Calculator/Calculator';
import Unstake from '../Unstake/Unstake';

export interface StakingSdkProps {
  handlers: {
    onOpen: ((config: WalletConfig) => void) | undefined;
  };
}

const StakingSdk: React.FC<StakingSdkProps> = (props) => {
  const {isOpen, openWidget, closeWidget} = useWidgetState();
  const {route} = useNavigation();

  props.handlers.onOpen = (config: WalletConfig) => {
    openWidget(config);
  };

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

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

export default StakingSdk;
